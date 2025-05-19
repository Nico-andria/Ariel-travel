const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Succesfully created",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const { password, role, ...rest } = user._doc;

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 heure
      })
      .status(200)
      .json({
        success: true,
        token,
        message: "successfully logged in",
        data: { ...rest },
        role,
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
