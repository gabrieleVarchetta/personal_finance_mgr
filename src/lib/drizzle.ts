import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { desc, eq } from "drizzle-orm";
import { Transactions } from "@/types";

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql, { schema });

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
      .select()
      .from(schema.transactions)
      .where(eq(schema.transactions.userId, id))
      .orderBy(desc(schema.transactions.date));

    return trxs as Transactions;
  } catch {
    return null;
  }
}
