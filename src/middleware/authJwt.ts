import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config";

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json("Not token");
  }

  jwt.verify(token, authConfig.accessToken.salt, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "BAD TOKEN", err: err });
    }
    req.userId = decoded.id;
    next();
  });
};
