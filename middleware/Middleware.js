// @ts-nocheck

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const userToken = req.headers["authorization"].split(" ")[1].trim();
    console.log(userToken);
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
