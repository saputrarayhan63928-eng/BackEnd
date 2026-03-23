import { type Request, type Response, type NextFunction } from "express";
import Jwt, { type JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_kunci_rahasia";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Token tidak ditemukan" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Format token tidak valid" });
  }

  const token = authHeader.substring("Bearer ".length).trim();

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token tidak ditemukan" });
  }

  try {
    const payload = Jwt.verify(
      token,
      JWT_SECRET
    ) as unknown as JwtPayload & { id: number; role: string };

    req.user = payload;
    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Token tidak valid" });
  }
};
