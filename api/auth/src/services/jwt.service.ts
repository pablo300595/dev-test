import { getConnection } from "../db";
import { Model } from "../models/model.enum";
import { User } from "../models/user.model";
import * as jwt from 'jsonwebtoken';

export class JwtService {
    static verifyToken(token: string): User | null {
        try {
            const decoded = jwt.verify(token, process.env['JWT_KEY']) as User;
            const users = getConnection().get(Model.users).value();

            const user = users.find(u => {
               return u._id === decoded._id
            });
            return user || null;
        } catch (error) {
          return null;
        }
      }
      
} 