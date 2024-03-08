import { z } from 'zod'

// form zod validation schema
export const registerSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    name: z.string().min(1, {
        message: "Please enter a name"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password does not match"
    }),
}) 

// This will generate the form types from zod validation schema
export type RegisterSchema = z.infer<typeof registerSchema>;