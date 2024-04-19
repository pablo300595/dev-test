import { Name } from './name.model';

export interface User {
    "_id": string
    "guid": string
    "isActive": boolean
    "balance": string
    "picture": string
    "age": number
    "eyeColor": string
    "name": Name
    "company": string
    "email": string
    "password": string
    "phone": string
    "address": string
}