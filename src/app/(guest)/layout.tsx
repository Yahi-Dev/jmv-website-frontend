import { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "JMV República Dominicana | Juventud Mariana Vicenciana",
  authors: [{ name: "JMV República Dominicana" }],
  creator: "JMV República Dominicana",
  publisher: "JMV República Dominicana",
    icons: {
    icon: "/JMV-Logo.png",
  },
}

export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}