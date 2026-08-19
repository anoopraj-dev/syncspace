import {z} from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(2,'First name must be atleast 2 characters'),
    lastName: z.string(),
    email:z.string().min(1,'Email is required').email('Enter a valid email'),
    username:z.string().min(1,'username is required'),
    password: z.string().min(8,'Password must be atleast 8 characters'),
    confirmPassword:z.string().min(1,'This field is required')
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message:'Passwords do not match',
        path:['confirmPassword']
    }
)