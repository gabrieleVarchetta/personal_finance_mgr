import { ACCOUNT_TYPES } from "@/costants";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const TransactionSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .max(32, {
      message: "Maximum 32 characters",
    }),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue >= 0.01;
      },
      { message: "Invalid price" }
    ),
  account: z.string({ required_error: "Select an account" }),
  category: z.string(),
});

export const AccountSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  type: z.enum(ACCOUNT_TYPES),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) && parsedValue >= 0.0;
      },
      { message: "Invalid amount" }
    )
    .default("0.0"),
});
