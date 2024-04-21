import { Handler, Response, Request } from "express";
import { getConnection } from "../db";
import { Model } from "../models/model.enum";

export const getCurrentUser: Handler = (req: Request, res: Response) => {
    console.log(req.session);
    res.send({ currentUser: req.currentUser || null});
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
        res.json(newUser);
    } catch (error) {
        res.status(500).send(error);
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