import { Handler, Response, Request } from "express";
import { getConnection } from "../db";
import { Model } from "../models/model.enum";
import * as jwt from 'jsonwebtoken';

export const getCurrentUser: Handler = (req: Request, res: Response) => {
    delete req.user.password;
    res.send({ currentUser: req.user || null});
};

export const getUsers: Handler = (req: Request, res: Response) => {
    const data = getConnection().get(Model.users).value();
    return res.json(data);
};

export const getUser: Handler = (req: Request, res: Response) => {
    const userFound = getConnection()
        .get(Model.users)
        .find({ _id: req.params[Model.id] })
        .value();

    if (!userFound) return res.status(404).json({ msg: "User not found" });

    return res.json(userFound);
};

export const createUser: Handler = (req: Request, res: Response) => {
    console.log('testAA')
    const {
        _id,
        guid,
        isActive,
        balance,
        picture,
        age,
        eyeColor,
        name,
        company,
        email,
        password,
        phone,
        address
    } = req.body;

    const newUser = {
        _id,
        guid,
        isActive,
        balance,
        picture,
        age,
        eyeColor,
        name,
        company,
        email,
        password,
        phone,
        address
    };

    try {
        getConnection().get(Model.users).push(newUser).write();
        console.log('delta')
        const userJwt = jwt.sign({
            _id: newUser._id,
            email: newUser.email
        }, process.env['JWT_KEY']);

        const session = {
            jwt: userJwt
        };
    
        req.session = session;

        return res.json({
            jwt: userJwt,
            newUser
        });

    } catch (error) {
        return res.status(500).send(error);
    }
};

export const updateUser: Handler = (req: Request, res:Response) => {
    try {
        const userFound = getConnection()
            .get(Model.users)
            .find({ _id: req.params[Model.id] })
            .value();
        
        if (!userFound) {
            return res.status(404).json({ msg: "User not found" });
        }

        const updatedUser = getConnection()
            .get(Model.users)
            .find({ _id: req.params[Model.id] })
            .assign(req.body)
            .write();
        
        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).send(error);
    }
};