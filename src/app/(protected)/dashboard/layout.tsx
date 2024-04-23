import SideNav from "@/components/dashboard/side-nav";
import UserCard from "@/components/dashboard/user-card";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex w-full">
          <SideNav>
            <UserCard />
          </SideNav>
          <div className="grow ml-60">
            {/* <div className="flex flex-col pt-2 px-4 space-y-2 bg-zinc-100 flex-grow pb-4"> */}
            {children}
            {/* </div> */}
          </div>
        </main>
      </body>
    </html>
  );
}
