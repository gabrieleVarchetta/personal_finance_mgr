"use server";

import db from "@/server/db";
import { deleteTransactionById } from "@/server/queries";
import { transactions } from "@/server/db/schema";
import { TransactionSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addTransaction(
  data: z.infer<typeof TransactionSchema>,
  type: "Income" | "Expense",
  userId?: string,
  accountId?: number,
  categoryId?: number
) {
  const validatedFields = TransactionSchema.safeParse(data);
  const validatedIds = userId && accountId && categoryId;

  if (!validatedFields.success || !validatedIds)
    return { error: "Invalid fields" };

  const { name, price, account, category } = validatedFields.data;

  try {
    console.log(type);
    await db.insert(transactions).values({
      name,
      price,
      date: new Date(),
      userId,
      categoryId,
      moneyAccountId: accountId,
      moneyAccountName: account,
      categoryName: category,
      type,
    });

    revalidatePath("/dashboard");
    return { message: "Transaction added successfully" };
  } catch {
    return { error: "Something went wrong" };
  }
}

export async function deleteTransaction(id: number) {
  try {
    console.log("porcodio", id);
    await deleteTransactionById(id);
    revalidatePath("/dashboard");
    return { message: "Transaction added successfully" };
  } catch {
    console.log("errore");
    return { error: "Something went wrong" };
  }
}

export async function editTransaction(
  id: number,
  name?: string,
  price?: number
) {}
