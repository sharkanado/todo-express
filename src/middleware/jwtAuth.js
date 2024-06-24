const jwt = require("jsonwebtoken");

//https://github.com/WebDevSimplified/JWT-Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, message: "Invalid token" });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
