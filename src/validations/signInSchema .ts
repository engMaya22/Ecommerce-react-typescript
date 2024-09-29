import { z } from "zod";


const signInSchema  = z.object({
     password : z.string().min(8,{ message: "Password is too short , at least 8 characters" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
    email: z.string().min(1,{ message: "Email address is required" }).email(),
    
});

type signInType = z.infer<typeof signInSchema >;//this means that all fields type is string

export  {signInSchema  , type signInType};