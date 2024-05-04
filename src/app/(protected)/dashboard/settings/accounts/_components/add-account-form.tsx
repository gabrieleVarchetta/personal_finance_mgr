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
import { AccountSchema, TransactionSchema } from "@/schemas";
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
import { addAccount } from "@/actions/accounts";
import { Button } from "@/components/ui/button";
import { ACCOUNT_TYPES } from "@/costants";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function AddAccountForm({
  userId,
}: {
  userId: string | undefined;
}) {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: "",
      type: "Cash",
      amount: "0.0",
    },
  });
  function onSubmit(values: z.infer<typeof AccountSchema>) {
    setError("");
    setSuccess("");

    addAccount(values, userId ?? "").then((data) => {
      setError(data.error ?? "");
      setSuccess(data.message ?? "");
      form.reset();
    });
  }
  return (
    <Card className="p-4">
      <CardTitle>Add an account</CardTitle>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Account name </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Banca Sella" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Account type </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ACCOUNT_TYPES?.map((account, index) => {
                          return (
                            <SelectItem key={index} value={account}>
                              {account}
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
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Amount </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="500.00" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={success} />
              <FormError message={error} />
              <Button type="submit" className="w-full">
                Add account
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
