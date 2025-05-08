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

    // if user doesn't exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //if user exist then check the password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // if password is incorrect
    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const { password, role, ...rest } = user._doc;

    // create jwt token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // set token in the browser
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
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
