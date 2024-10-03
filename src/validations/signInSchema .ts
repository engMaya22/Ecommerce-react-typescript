import { z } from "zod";


const signInSchema  = z.object({
    password : z.string().min(1,{ message: "Password is required" }),
    email: z.string().min(1,{ message: "Email address is required" }).email(),
    
});

type signInType = z.infer<typeof signInSchema >;//this means that all fields type is string

export  {signInSchema  , type signInType};