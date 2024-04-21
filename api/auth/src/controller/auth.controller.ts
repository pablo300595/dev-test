import { Handler, Response, Request } from "express";
import { Model } from "../models/model.enum";
import { getConnection } from "../db";
import { BadRequestError } from "@mirval/common";
import { Password } from "../services/password.service";
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model";

export const signIn: Handler = async(req: Request, res: Response) => {
    const  { email, password } = req.body;

    const existingUser: User = getConnection()
        .get(Model.users)
        .find({ 
            email,
            password
        })
        .value();

    console.log('existingUser', existingUser);

    if (!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compareNonCrypt(
        existingUser.password, 
        password
    );

    if(!passwordMatch) {
        throw new BadRequestError('Invalid Credentials');
    }

    const userJwt = jwt.sign({
        id: existingUser._id,
        email: existingUser.email
    }, process.env['JWT_KEY']);

    const session = {
        jwt: userJwt
    };

    req.session = session;

    console.log(req.session);

    delete existingUser.password;

    return res.status(200).send({
        session,
        existingUser
    });
};