"use server";

import db from "@/server/db";
import { deleteTransactionById } from "@/server/queries";
import { moneyAccounts, transactions } from "@/server/db/schema";
import { AccountSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addAccount(
  data: z.infer<typeof AccountSchema>,
  userId: string
) {
  const validatedFields = AccountSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Invalid fields" };

  const { name, type, amount } = validatedFields.data;

  try {
    await db.insert(moneyAccounts).values({
      name,
      createdAt: new Date(),
      userId,
      type,
      amount,
    });

    revalidatePath("/dashboard/settings/accounts");
    return { message: "Transaction added successfully" };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
}
