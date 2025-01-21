import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies["auth_token"];
    if (!token) {
        res.status(401).json({ message: "Not authorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        req.userId = (decoded as JwtPayload).userId;
        next();
        return;
    } catch (error) {
        res.status(401).json({ message: "Not authorized" });
        return;
    }
};

export default verifyToken;
