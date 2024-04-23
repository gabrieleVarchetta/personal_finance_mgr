import { auth } from "@/auth";
import { getAccountsByUserId, getCategoriesByUserId } from "@/server/queries";
import { redirect } from "next/navigation";

export default async function Categories() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  const categories = await getCategoriesByUserId(session.user.id ?? "");
  return (
    <div>
      <h1 className="font-bold">CATEGORIE ZIO PERA</h1>
      {categories?.map((category, index) => {
        return (
          <p key={index}>
            {category.name} - {category.type}
          </p>
        );
      })}
    </div>
  );
}
