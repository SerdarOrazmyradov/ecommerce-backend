export const verifyUser = (req, res, next) => {
  console.log("user taken from token ", req.user);
  const user = req.user;
  if (user.role === "customer") {
    return next();
  } else {
    return res.status(402).json({ message: "siz customer däl" });
  }
};
