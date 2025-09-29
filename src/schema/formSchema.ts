import { boolean, email, object, string, enum as zodEnum } from 'zod';

export const personalInfoSchema = object({
    name: string().min(1, 'Name is required'),
    email: email('Invalid email address').min(1, 'Email is required'),
    phone: string().min(1, 'Phone number is required'),
});

export const planSchema = object({
    plan: zodEnum(['arcade', 'advanced', 'pro'], 'Plan is required'),
    billingCycle: zodEnum(['monthly', 'yearly'], 'Billing cycle is required'),
});

export const addOnsSchema = object({
    onlineService: boolean().optional(),
    largerStorage: boolean().optional(),
    customizableProfile: boolean().optional(),
});

const formSchema = object({
    personalInfo: personalInfoSchema,
    plan: planSchema,
    addOns: addOnsSchema,
});

export default formSchema;
