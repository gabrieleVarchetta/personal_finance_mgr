// "use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "@/components/ui/badge";
import { deleteTransaction } from "@/actions/transactions";
import { Transaction } from "@/types";

interface TransactionItemProps {
  transaction: Transaction;
}
export default function TransactionItem({ transaction }: TransactionItemProps) {
  const deleteTransactionById = deleteTransaction.bind(null, transaction.id);

  return (
    <TableRow>
      <TableCell className="font-medium">{transaction.name}</TableCell>
      <TableCell>
        <Badge variant="outline">{transaction.category}</Badge>
      </TableCell>
      <TableCell>${transaction.price}</TableCell>
      <TableCell className="hidden md:table-cell">
        {transaction.account}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {transaction.date.toDateString()}
      </TableCell>
      <TableCell className="hidden md:table-cell">{transaction.type}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <form action={deleteTransactionById}>
              <button className="w-full">
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
