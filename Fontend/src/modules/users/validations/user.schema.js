import { z } from 'zod';

export const registerSchema = z.object({

    username: z
        .string()
        .min(3, "Name อย่างน้อย 3 ตัว"),

    full_name: z
        .string()
        .min(3, "Full name is required"),

    password: z
        .string()
        .min(6, "Password อย่างน้อย 6 ตัว"),
    role: z
        .string()
        .min(1, "กรุณาเลือกสิทธิ์")
        
});