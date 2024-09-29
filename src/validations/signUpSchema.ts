import { z } from "zod";


const signUpSchema = z.object({
    firstName : z.string().min(1,{ message: "First name is required" }),
    lastName : z.string().min(1,{ message: "Last name is required" }),
    password : z.string().min(8,{ message: "Password is too short , at least 8 characters" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
    email: z.string().min(1,{ message: "Email address is required" }).email(),
    confirmPassword: z.string().min(1,{ message: "Confirm password is required" }),
}) .refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // path of error
});
// interface IFormInput {
//   email: string,
//   password: string,
//   firstName: string,
//   lastName: string,
//   confirmPassword:string,
// }
type signUpType = z.infer<typeof signUpSchema>;//this means that all fields type is string

export  {signUpSchema , type signUpType};