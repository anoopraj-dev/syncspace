import { Request,Response } from "express"
import HTTP_STATUS from "../../constants/http-status.js";

export function signupController(req:Request,res:Response){
    try {
        const {name,email,password,username} = req.body;
        console.log(name,email,username)
        res.status(HTTP_STATUS.OK).json({
            success:true,
            message:'Response from server'
        })
    } catch (error) {
        console.error(error)
    }
}