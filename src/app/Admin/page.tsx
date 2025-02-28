"use client";

import withAdminAuth from "./withAdminAuth";

function AdminDashboard({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 p-6  dark:bg-bannerbg">{children}</main>
  );
}

export default withAdminAuth(AdminDashboard);
