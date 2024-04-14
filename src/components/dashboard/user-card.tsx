import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UserCard() {
  const session = await auth();
  return (
    <div className="flex justify-center items-center border rounded-md gap-2 p-4">
      <Avatar>
        <AvatarImage
          src={session?.user?.image as string | undefined}
          alt="user image"
        />
        <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-[16px] font-bold">{session?.user?.name}</p>
        <p className="text-[12px] text-neutral-500">{session?.user?.email}</p>
      </div>
    </div>
  );
}

function getInitials(name: string | null | undefined) {
  if (name) {
    const words = name.split(" ");
    const initals = words.map((w) => w.charAt(0));
    return initals.join("");
  }
  return "US";
}
