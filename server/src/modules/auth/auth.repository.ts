import User from "../../models/user.model.js";
import type { RegisterInput } from "./auth.validataion.js";

export async function findUserByEmail (email: string){
    return User.findOne({email});
}

export async function findByUsername(username: string){
    return User.findOne({username})
}

export async function createUser(data:RegisterInput){
    return User.create(data);
}