import UserModel from "../../models/user.model.js";
import type { RegisterInput } from "./auth.validataion.js";

export async function findUserByEmail (email: string){
    return UserModel.findOne({email});
}

export async function findByUsername(username: string){
    return UserModel.findOne({username})
}

export async function createUser(data:RegisterInput){
    return UserModel.create(data);
}