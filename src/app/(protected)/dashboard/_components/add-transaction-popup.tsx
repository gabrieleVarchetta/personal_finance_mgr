import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AddTransactionForm from "./add-transaction-form";
import { Account, Category } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AddTransactionPopup({
  userId,
  accounts,
  categories,
}: {
  userId: string | undefined;
  accounts: Account[] | null;
  categories: Category[] | null;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add transaction</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <Tabs defaultValue="expense">
          <TabsList className="flex items-center justify-center">
            <TabsTrigger
              value="expense"
              className="data-[state=active]:bg-expense data-[state=inactive]:text-expense-foreground"
            >
              Expense
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="data-[state=active]:bg-income data-[state=inactive]:text-income-foreground"
            >
              Income
            </TabsTrigger>
          </TabsList>
          <TabsContent value="expense">
            <AddTransactionForm
              userId={userId}
              categories={categories}
              accounts={accounts}
              type="Expense"
            />
          </TabsContent>
          <TabsContent value="income">
            <AddTransactionForm
              userId={userId}
              categories={categories}
              accounts={accounts}
              type="Income"
            />
          </TabsContent>
        </Tabs>
      </AlertDialogContent>
    </AlertDialog>
  );
}
