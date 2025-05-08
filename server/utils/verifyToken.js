const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.cookies?.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authorize, token is unavailable",
    });
  }

  // if token exists then verify the token
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }
    req.user = user;
    next(); // don't forget to call next
  });
};

exports.verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authenticated",
      });
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user);
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not admin so you are unauthorized",
      });
    }
  });
};
