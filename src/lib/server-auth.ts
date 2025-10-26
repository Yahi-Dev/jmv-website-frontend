// src/lib/server-auth.ts
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";

export async function getServerSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    return session;
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}

export async function getServerUser() {
  const session = await getServerSession();
  if (!session?.user) return null;
  
  return {
    id: session.user.id ?? "",
    userName: (session.user as any).userName ?? "",
    email: session.user.email ?? "",
    firstName: (session.user as any).firstName ?? "",
    lastName: (session.user as any).lastName ?? "",
    isActive: (session.user as any).isActive ?? true,
  };
}