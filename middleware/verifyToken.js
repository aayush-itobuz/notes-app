import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
        if (error) {
          console.log(error);
          res.status(401).json({ error: "Unauthorized" });
        } else {
          const user_id = decoded.id;
          const user = await userSchema.findById(user_id);
          if (!user) {
            return res.status(404).json({
              success: false,
              message: "user not found",
            });
          } else if (user.isLogged === "false") {
            return res.status(400).json({
              success: false,
              message: "user has logged out",
            });
          } else {
            req.userId = user_id;
            next();
          }
        }
      })
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};