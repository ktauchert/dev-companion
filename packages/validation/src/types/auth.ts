import type * as z from "zod";

import { LoginSchema, RegisterSchema } from "../schemas/auth.js";

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
