"use server";

import db from "@/lib/drizzle";
import { transactions } from "@/lib/schema";
import { TransactionSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addTransaction(
  data: z.infer<typeof TransactionSchema>,
  userId: string
) {
  const validatedFields = TransactionSchema.safeParse(data);
  console.log(validatedFields);
  console.log(userId);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const { name, price } = validatedFields.data;

  try {
    await db.insert(transactions).values({
      name,
      price,
      date: new Date(),
      userId,
    });

    revalidatePath("/dashboard");
    return { message: "Transaction added successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
}
