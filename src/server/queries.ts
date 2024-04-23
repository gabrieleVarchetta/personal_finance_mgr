import * as schema from "./db/schema";
import { desc, eq, sum } from "drizzle-orm";
import { Account, Category, Transaction } from "@/types";
import db from "./db/index";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });

    return user;
  } catch {
    return null;
  }
}
export default db;

export async function getTransactionsByUserId(id: string) {
  try {
    const trxs = await db
      .select({
        name: schema.transactions.name,
        id: schema.transactions.id,
        date: schema.transactions.date,
        price: schema.transactions.price,
        category: schema.transactions.categoryName,
        account: schema.transactions.moneyAccountName,
      })
      .from(schema.transactions)
      .where(eq(schema.transactions.userId, id))
      .orderBy(desc(schema.transactions.date));

    return trxs as Transaction[];
  } catch {
    return null;
  }
}

export async function getTotalSpentByUserId(id: string) {
  try {
    const res = await db
      .select({
        total: sum(schema.transactions.price),
      })
      .from(schema.transactions)
      .where(
        eq(schema.transactions.userId, id) &&
          eq(schema.transactions.type, "Expense")
      );
    return res[0].total != null ? res[0].total : "0";
  } catch {
    return null;
  }
}

export async function getTotalEarnedByUserId(id: string) {
  try {
    const res = await db
      .select({
        total: sum(schema.transactions.price),
      })
      .from(schema.transactions)
      .where(
        eq(schema.transactions.userId, id) &&
          eq(schema.transactions.type, "Income")
      );
    return res[0].total != null ? res[0].total : "0";
  } catch {
    return null;
  }
}

export async function getAccountsByUserId(id: string) {
  try {
    const res = await db
      .select({
        name: schema.moneyAccounts.name,
        id: schema.moneyAccounts.id,
      })
      .from(schema.moneyAccounts);

    return res as Account[];
  } catch {
    return null;
  }
}

export async function getCategoriesByUserId(id: string) {
  try {
    const res = await db
      .select({
        name: schema.categories.name,
        type: schema.categories.type,
        id: schema.categories.id,
      })
      .from(schema.categories);

    return res as Category[];
  } catch {
    return null;
  }
}

export async function deleteTransactionById(id: number) {
  try {
    await db.delete(schema.transactions).where(eq(schema.transactions.id, id));
    return { message: "Success" };
  } catch {
    return { error: "Palle" };
  }
}

export async function updateTransactionById(id: number) {}
