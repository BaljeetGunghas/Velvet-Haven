"use client";

import withAdminAuth from "./withAdminAuth";

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {


  return (
      <main className="flex-1 p-6 bg-gray-100 dark:bg-bannerbg">{children}</main>
  );
};

export default withAdminAuth(AdminDashboard);
