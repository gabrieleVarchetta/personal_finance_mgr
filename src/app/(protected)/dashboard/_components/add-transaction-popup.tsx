import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AddTransactionForm from "./add-transaction-form";

export default function AddTransactionPopup({ userId }: { userId: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add transaction</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AddTransactionForm userId={userId} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
