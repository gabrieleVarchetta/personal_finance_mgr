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
import { addTransaction } from "@/actions/transactions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Account, Category } from "@/types";

export default function AddTransactionForm({
  userId,
  accounts,
  categories,
  type,
}: {
  userId: string | undefined;
  accounts: Account[] | null;
  categories: Category[] | undefined;
  type: "Income" | "Expense";
}) {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      name: "",
      price: "",
      account: "",
      category: "",
    },
  });
  function onSubmit(values: z.infer<typeof TransactionSchema>) {
    setError("");
    setSuccess("");

    const accountId = accounts?.find(
      (account) => account.name == values.account
    )?.id;

    const categoryId = categories?.find(
      (category) => category.name == values.category
    )?.id;

    addTransaction(values, type, userId, accountId, categoryId).then((data) => {
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
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Account </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts?.map((account, index) => {
                          return (
                            <SelectItem key={index} value={account.name}>
                              {account.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Category </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category, index) => {
                          return (
                            <SelectItem key={index} value={category.name}>
                              {category.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
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
