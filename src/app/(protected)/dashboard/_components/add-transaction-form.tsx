"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { z } from "zod";
import { useState } from "react";
import { addTransaction } from "@/actions/addTransaction";
import { Button } from "@/components/ui/button";

export default function AddTransactionForm({ userId }: { userId: string }) {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  });
  function onSubmit(values: z.infer<typeof TransactionSchema>) {
    setError("");
    setSuccess("");

    addTransaction(values, userId).then((data) => {
      setError(data.error ?? "");
      setSuccess(data.message ?? "");
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Insert the data of the transaction
            </AlertDialogTitle>
            <AlertDialogDescription>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Email </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Pizza with the boys"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Password </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="12.99" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={success} />
              <FormError message={error} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <button type="submit">
              <AlertDialogAction>Continue</AlertDialogAction>
            </button>
          </AlertDialogFooter>
        </div>
      </form>
    </Form>
  );
}
