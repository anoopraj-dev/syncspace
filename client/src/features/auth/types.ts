
export interface RegisterPayload{
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
}

export interface LoginPayload{
    email: string;
    password: string
}