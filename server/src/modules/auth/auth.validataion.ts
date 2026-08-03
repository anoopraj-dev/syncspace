import { z } from "zod";

//signup validation
export const registerSchema = z.object({
    firstName: z
    .string()
    .trim()
    .min(2, 'First name mustbe at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters'),

    lastName: z
        .string()
        .trim()
        .max( 50, 'Last name cannot exceed 50 characters')
        .optional(),

    username: z
        .string()
        .trim()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username cannot exceed 30 characters'),

    email: z
        .string()
        .trim()
        .email('Invalid email address')
        .transform(email => email.toLowerCase()),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(100)
})

export type RegisterInput = z.infer<typeof registerSchema>;

//signin validation

export const loginSchema = z.object({
    identifier: z
        .string()
        .trim()
        .min(2,'Email or username required'),

    password: z
        .string()
        .min(8,'Password must be at least 8 characters')
})

export type loginInput = z.infer<typeof loginSchema>;