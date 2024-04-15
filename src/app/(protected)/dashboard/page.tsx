import { redirect } from "next/navigation";

import Link from "next/link";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";
import { transactions } from "@/lib/schema";
import { getTransactionsByUserId } from "@/lib/drizzle";
import TransactionItem from "@/components/dashboard/transaction-item";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const transactions = await getTransactionsByUserId(session.user.id ?? "");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>List of your transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions &&
              transactions.map((trx, idx) => {
                return (
                  <TransactionItem
                    name={trx.name!}
                    trxId={trx.id!}
                    key={`trx-${trx.id}-${idx}`}
                    date={trx.date!}
                    price={trx.price!}
                  />
                );
              })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
