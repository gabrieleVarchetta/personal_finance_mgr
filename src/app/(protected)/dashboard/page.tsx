import { redirect } from "next/navigation";

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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/auth";
import {
  getAccountsByUserId,
  getCategoriesByUserId,
  getTransactionsByUserId,
} from "@/server/queries";
import TransactionItem from "@/components/dashboard/transaction-item";
import AddTransactionPopup from "./_components/add-transaction-popup";
import { TransactionPagination } from "./_components/pagination";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const transactions = await getTransactionsByUserId(session.user.id ?? "");
  const accounts = await getAccountsByUserId(session.user.id ?? "");
  const categories = await getCategoriesByUserId(session.user.id ?? "");
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>List of your transactions.</CardDescription>
          </div>
          <div>
            <AddTransactionPopup
              userId={session.user.id}
              accounts={accounts}
              categories={categories}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Account</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions &&
              transactions.map((trx, idx) => {
                return <TransactionItem transaction={trx} key={idx} />;
              })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {/* <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div> */}
        {/* <TransactionPagination /> */}
      </CardFooter>
    </Card>
  );
}
