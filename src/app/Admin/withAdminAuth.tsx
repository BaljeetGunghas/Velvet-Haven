"use client";

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState, ComponentType } from "react";

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();
    const cookies = parseCookies();
    const userRole = cookies.userRole;

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
      if (!userRole || userRole !== "host") {
        router.replace("/404");
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    }, [userRole, router]);

    // Prevent rendering before checking authentication
    if (isAuthorized === null) return null;

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };

  WithAuthComponent.displayName = `WithAdminAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAdminAuth;
