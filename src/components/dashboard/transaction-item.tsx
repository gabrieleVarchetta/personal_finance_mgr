"use client";
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

interface TransactionItemProps {
  key: string;
  name: string;
  price: string;
  date: Date;
}
export default function TransactionItem({
  key,
  name,
  price,
  date,
}: TransactionItemProps) {
  return (
    <TableRow key={key}>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        <Badge variant="outline">Draft</Badge>
      </TableCell>
      <TableCell>${price}</TableCell>
      <TableCell className="hidden md:table-cell">25</TableCell>
      <TableCell className="hidden md:table-cell">
        {date.toDateString()}
      </TableCell>
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
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
