import { auth } from "@/auth";
import db, { getTransactionsByUserId } from "@/lib/drizzle";
import { transactions, users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
