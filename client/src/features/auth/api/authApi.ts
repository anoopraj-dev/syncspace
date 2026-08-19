import { api } from "../../../configs/axios.config"
import type { LoginPayload, RegisterPayload } from "../types"

//register

export function registerUser(payload:RegisterPayload){
    return api.post('/auth/register',payload)
}
//Login
export function loginUser(payload:LoginPayload){
    return api.post('/login',payload)
}