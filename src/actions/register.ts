"use server";
import { z } from "zod";

import { RegisterSchema } from "@/schemas";
import db, { getUserByEmail } from "@/lib/drizzle";
import { users } from "@/lib/schema";
import { createId } from "@paralleldrive/cuid2";

import bcrypt from "bcryptjs";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPsw = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.insert(users).values({
    id: createId(),
    name,
    email,
    password: hashedPsw,
  });
  return { success: "Email sent" };
}
