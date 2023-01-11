function isSuperAdmin(req, res, next) {
  if (req.user.type.toLowerCase() === "super-admin") {
    return next();
  }

  return res.status(401).json({
    status: false,
    message: "Unauthorized",
    data: {},
  });
}

function isAdmin(req, res, next) {
  if (req.user.type.toLowerCase() === "admin") {
    return next();
  }

  return res.status(401).json({
    status: false,
    message: "Unauthorized",
    data: {},
  });
}

module.exports = { isSuperAdmin, isAdmin };
