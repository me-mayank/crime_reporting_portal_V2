export const adminOnly = async (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(403).json({
      message: "Admin access is required to go further !!",
    });
  }
  next();
};
