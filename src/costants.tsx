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
    path: "/stats",
    icon: <IoMdStats className="w-6 h-6" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoMdPeople className="w-6 h-6" />,
    submenu: true,
    subMenuItems: [
      { title: "Accounts", path: "/settings/accounts" },
      { title: "Categories", path: "/settings/categories" },
    ],
  },
];
