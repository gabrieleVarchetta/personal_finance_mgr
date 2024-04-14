import db from "@/lib/drizzle";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const user = await db;
}
