import { FC } from "react"; 
import withAdminAuth from "./Components/withAdminAuth";
// import { NextPage } from "next";

export interface AdminProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
}

const AdminDashboard: FC<AdminProps> = ({ children }) => {
  return <main className="flex-1 p-6 dark:bg-bannerbg">{children}</main>;
};

export default withAdminAuth(AdminDashboard);
