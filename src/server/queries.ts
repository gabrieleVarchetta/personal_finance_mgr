import * as schema from "./db/schema";
import { and, desc, eq, sum } from "drizzle-orm";
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
        type: schema.transactions.type,
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
    console.log("uela");
    const res = await db
      .select({
        total: sum(schema.transactions.price),
      })
      .from(schema.transactions)
      .where(
        and(
          eq(schema.transactions.userId, id),
          eq(schema.transactions.type, "Expense")
        )
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
        and(
          eq(schema.transactions.userId, id),
          eq(schema.transactions.type, "Income")
        )
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
        type: schema.moneyAccounts.type,
        amount: schema.moneyAccounts.amount,
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

export async function updateMoneyAccountAmount(
  accountId: number,
  trxAmount: string,
  transactionType: "Income" | "Expense"
) {
  const accAmount = await getMoneyAccountAmountById(accountId);

  try {
    if (transactionType === "Income") {
      await db
        .update(schema.moneyAccounts)
        .set({
          amount: (parseFloat(accAmount!) + parseFloat(trxAmount)).toString(),
        })
        .where(eq(schema.moneyAccounts.id, accountId));
    } else {
      await db
        .update(schema.moneyAccounts)
        .set({
          amount: (parseFloat(accAmount!) - parseFloat(trxAmount)).toString(),
        })
        .where(eq(schema.moneyAccounts.id, accountId));
    }
  } catch (err) {
    return { error: err };
  }
}

export async function getMoneyAccountAmountById(accountId: number) {
  try {
    const res = await db
      .select({
        amount: schema.moneyAccounts.amount,
      })
      .from(schema.moneyAccounts)
      .where(eq(schema.moneyAccounts.id, accountId));

    return res[0].amount;
  } catch {
    return null;
  }
}

export async function getTotalAmountPerAccountByUserId(userId: string) {
  try {
    const res = await db
      .select({
        total: sum(schema.moneyAccounts.amount),
        type: schema.moneyAccounts.type,
      })
      .from(schema.moneyAccounts)
      .where(eq(schema.moneyAccounts.userId, userId))
      .groupBy(schema.moneyAccounts.type);

    const resultObject: Record<string, string | null> = {}; // Define an empty object

    // Loop through the result array and construct the object
    res.forEach(
      (item: {
        total: string | null;
        type: "Investments" | "Cash" | "Bank Accounts";
      }) => {
        resultObject[item.type] = item.total; // Assigning type as key and total as value
      }
    );
    console.log(resultObject);
    return resultObject;
  } catch {
    return null;
  }
}
