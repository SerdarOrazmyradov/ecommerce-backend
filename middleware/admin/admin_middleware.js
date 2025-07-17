import "dotenv/config";

export const verifyAdmin = (req, res, next) => {
    console.log("user taken from token ", req.user);
    const user = req.user;
    if (user.role === "admin") {
      return next();
    } else {
      return res.status(402).json({ message: "siz admin däl" });
    }
  }