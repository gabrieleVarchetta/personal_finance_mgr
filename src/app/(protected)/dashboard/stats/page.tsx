import { DollarSign } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getTotalEarnedByUserId,
  getTotalSpentByUserId,
} from "@/server/queries";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Stats() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  const totalSpent = await getTotalSpentByUserId(session.user.id ?? "");
  const totalEarned = await getTotalEarnedByUserId(session.user.id ?? "");
  return (
    <div className="flex space-x-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalSpent}</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalEarned}</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
