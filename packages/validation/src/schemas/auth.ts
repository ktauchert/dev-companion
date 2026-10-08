import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(12, { error: "Password must be at least 12 characters long" }),
});

export const RegisterSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(3, { error: "Name must be at least 3 characters long" }),
    email: z.email({ error: "Invalid email address" }),
    password: z
      .string({ error: "Password is required" })
      .min(12, { error: "Password must be at least 12 characters long" }),
    repeatPassword: z
      .string({ error: "Repeat password is required" })
      .min(12, { error: "Repeat password must be at least 12 characters long" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    error: "Passwords do not match",
  });
