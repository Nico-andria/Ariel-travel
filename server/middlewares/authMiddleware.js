const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré", success: false });
    }
    res.send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = authMiddleware;
