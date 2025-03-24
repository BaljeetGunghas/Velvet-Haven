"use client";

// import withAdminAuth from "./Components/withAdminAuth";
// import { NextPage } from "next";
// import { ReactNode } from "react"; // ✅ Add this import

// export interface AdminProps {
//   children?: ReactNode;
// }

// const AdminDashboard: NextPage<AdminProps> = ({ children }) => {
const AdminDashboard = () => {
  return <main className="flex-1 p-6 dark:bg-bannerbg">{"hello Admin"}</main>;
  // return <main className="flex-1 p-6 dark:bg-bannerbg">{children}</main>;
};

export default AdminDashboard;
