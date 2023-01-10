module.exports.isAdmin = function (req, res, next) {
  if (req.user.type.toLowerCase() === "admin") {
    next();
  }

  res.status(401).json({
    message: "Unauthorized",
  });
};
