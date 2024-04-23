import { transactions } from "@/server/db/schema";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

// export type Transaction = typeof transactions.$inferInsert;
export type Transaction = {
  name: string;
  id: number;
  date: Date;
  price: string;
  category: string;
  account: string;
  type: "Expense" | "Income";
};

export type Category = {
  name: string;
  type: "Expense" | "Income";
  id: number;
};

export type Account = {
  name: string;
  id: number;
};
