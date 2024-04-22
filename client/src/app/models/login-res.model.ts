import { User } from "./user.model"

export interface LoginRes {
    session: {
        jwt: string
    },
    existingUser?: User
}