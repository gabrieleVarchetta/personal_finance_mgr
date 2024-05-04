import { auth } from "@/auth";
import {
  getAccountsByUserId,
  getTotalAmountPerAccountByUserId,
} from "@/server/queries";
import { redirect } from "next/navigation";
import AddAccountForm from "./_components/add-account-form";
import { ACCOUNT_TYPES } from "@/costants";

export default async function Accounts() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  const accounts = await getAccountsByUserId(session.user.id ?? "");
  const amounts = await getTotalAmountPerAccountByUserId(session.user.id ?? "");
  return (
    <div className="p-4">
      <h1 className="font-bold">ACCOUNT ZIO PERA</h1>
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-2">
          {ACCOUNT_TYPES.map((type, index) => {
            return (
              <div key={index}>
                <h2 className="font-semibold">
                  {type} {amounts![type] ?? "0.00"}$
                </h2>
                <div className="flex flex-col">
                  {accounts
                    ?.filter((acc) => acc.type === type)
                    .map((account, index) => {
                      return (
                        <span key={index}>
                          {account.name} :{" "}
                          {parseFloat(account.amount) == 0
                            ? ""
                            : parseFloat(account.amount) > 0
                            ? "+"
                            : "-"}
                          {account.amount}$
                        </span>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
        <AddAccountForm userId={session.user.id ?? ""} />
      </div>
    </div>
  );
}
