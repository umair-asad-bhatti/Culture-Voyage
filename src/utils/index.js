import { z } from 'zod'
const ZodLoginSchema = z.object({
    email: z.string().email({message:'Please provide a valid email'}),
    password: z.string().min(8,{message:"Password must contains atleast 8 characters"})
})

const ZodSignupSchema = z.object({
    email: z.string().email(),
    password: z.string().refine((password) => {
        // At least one uppercase letter
        const hasUpperCase = /[A-Z]/.test(password);

        // At least one lowercase letter
        const hasLowerCase = /[a-z]/.test(password);

        // At least one special character (non-alphanumeric)
        const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(password);

        // No spaces
        const hasNoSpaces = !/\s/.test(password);

        // At least one number
        const hasNumber = /\d/.test(password);

        return hasUpperCase && hasLowerCase && hasSpecialCharacter && hasNoSpaces && hasNumber;
    }, {
        message: 'Invalid password format. It must contain at least one uppercase letter, one lowercase letter, one special character, no spaces, and at least one number.',
    })
})

export { ZodLoginSchema, ZodSignupSchema }