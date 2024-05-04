import { IoMdHome, IoMdStats, IoMdPeople } from "react-icons/io";
import { SideNavItem } from "@/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <IoMdHome className="w-6 h-6" />,
  },
  {
    title: "Stats",
    path: "/dashboard/stats",
    icon: <IoMdStats className="w-6 h-6" />,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <IoMdPeople className="w-6 h-6" />,
    submenu: true,
    subMenuItems: [
      { title: "Accounts", path: "/dashboard/settings/accounts" },
      { title: "Categories", path: "/dashboard/settings/categories" },
    ],
  },
];

// se volete capire il as const https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
export const ACCOUNT_TYPES = ["Investments", "Cash", "Bank Accounts"] as const;
