import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

export const usePortal = (children: ReactNode) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portal = document.getElementById("modal-root");
  if (!portal) return null;

  return createPortal(children, portal);
};
