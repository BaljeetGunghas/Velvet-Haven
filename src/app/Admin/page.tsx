"use client";

import withAdminAuth from "./withAdminAuth";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto flex h-72 bg-slate-300 justify-center items-center">
      <h1>Welcome, Admin</h1>
    </div>
  );
};

export default withAdminAuth(AdminDashboard);
