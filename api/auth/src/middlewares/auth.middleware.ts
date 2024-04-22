import { NextFunction, Request, Response } from "express";
import { JwtService } from "../services/jwt.service";
import { User } from "../models/user.model";

interface UserPayload {
  id: string;
  email: string;
}


declare global {
  namespace Express {
      interface Request {
          user?: User;
      }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const user = JwtService.verifyToken(token);
      if (user) {
        console.log('user:::', user)
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      res.status(401).json({ message: 'No token provided' });
    }
  };
  