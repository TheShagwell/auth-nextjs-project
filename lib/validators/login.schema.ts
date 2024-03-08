import { z } from 'zod'

// form zod validation schema
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
}) 

// This will generate the form types from zod validation schema
export type LoginSchema = z.infer<typeof LoginSchema>;