import UserModel from "../../models/user.model.js";
import Session from '../../models/session.model.js'
import type { RegisterInput } from "./auth.validataion.js";

//user operations
export async function findUserByEmail (email: string){
    return UserModel.findOne({email});
}

export async function findByUsername(username: string){
    return UserModel.findOne({username})
}

export async function createUser(data:RegisterInput){
    return UserModel.create(data);
}

export async function findUserById (id: string){
    return UserModel.findById(id);
}

export async function findUserByIdentifier(identifier: string){
    return UserModel.findOne({
        $or: [
            {email: identifier},
            {username: identifier}
        ]
    }).select('+password');
}

//session operations
export async function createSession(data: {
    user: string;
    expiresAt: Date;
}){
    return Session.create({
        user: data.user,
        expiresAt:data.expiresAt
    })
}

export async function updateSessionRefreshTokenHash(sessionId: string,data: {
    refreshTokenHash: string;
    expiresAt: Date,
}){
    return Session.findByIdAndUpdate(
        sessionId,
         data,
        { returnDocument: 'after'}
    )
}

export async function findSessionById(sessionId: string){
    return Session.findById(sessionId)
}

export async function deleteSession(sessionId: string){
    return Session.findByIdAndDelete(sessionId);
}

export async function deleteAllUserSession( userId: string){
    return Session.deleteMany({user: userId});
}
