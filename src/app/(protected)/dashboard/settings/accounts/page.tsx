import { auth } from "@/auth";
import { getAccountsByUserId } from "@/server/queries";
import { redirect } from "next/navigation";

export default async function Accounts() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  const accounts = await getAccountsByUserId(session.user.id ?? "");
  return (
    <div>
      <h1 className="font-bold">ACCOUNT ZIO PERA</h1>
      {accounts?.map((account, index) => {
        return <p key={index}>{account.name}</p>;
      })}
    </div>
  );
}
