"use client";

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { ComponentType } from "react";

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();
    const cookies = parseCookies();
    const userRole = cookies.userRole;

    useEffect(() => {
      if (!userRole || userRole !== "host") {
        router.replace("/403");
      }
    }, [userRole, router]);

    if (!userRole || userRole !== "host") {
      return null; // Prevent rendering before redirect
    }

    return <WrappedComponent {...props} />;
  };

  // Set a display name for debugging
  WithAuthComponent.displayName = `WithAdminAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAdminAuth;
