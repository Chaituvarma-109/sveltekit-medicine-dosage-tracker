import {z} from "zod";


export const medicineSchema = z.object({
    medicine_name: z.string(),
    quantity: z.number().positive(),
    dosage: z.enum(['mg', 'ml']),
    start_date: z.string().date(),
    end_date: z.string().date(),
    time: z.string().time(),
    frequency: z.number().positive(),
});