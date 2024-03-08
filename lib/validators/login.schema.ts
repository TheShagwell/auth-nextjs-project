import { z } from 'zod'

// form zod validation schema
export const loginSchema = z.object({
    userId: z.string().nonempty({ message: 'User ID is required' }),
    password: z.string().min(5,{ message: 'Password is required' }),
    language: z.string().optional().default('en'),
}) 

// This will generate the form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;