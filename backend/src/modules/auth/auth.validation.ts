import { z } from "zod";

// Regex pour mot de passe fort : min 8 caractères, majuscule, minuscule, chiffre, caractère spécial
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(strongPasswordRegex, {
      message:
        "Password must include uppercase, lowercase, number and special character",
    }),
  role: z.enum(["CANDIDATE", "RECRUITER"])
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(strongPasswordRegex, {
      message:
        "Password must include uppercase, lowercase, number and special character",
    }),
});

