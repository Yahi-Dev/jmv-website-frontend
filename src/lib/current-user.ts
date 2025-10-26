import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";
import { authClient } from "./auth-client";

interface SessionUser {
  id?: string;
  userName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}

interface Session {
  user?: SessionUser;
}

function mapUser(session: Session) {
  return {
    id: session.user?.id ?? "",
    userName: session.user?.userName ?? "",
    email: session.user?.email ?? "",
    firstName: session.user?.firstName ?? "",
    lastName: session.user?.lastName ?? "",
    isActive: session.user?.isActive ?? true,
  };
}

export async function getCurrentUser() {
  try {
    if (typeof window === "undefined") {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) return null;
      return mapUser(session);
    }

    const { data: session } = await authClient.getSession();
    if (!session?.user) return null;
    return mapUser(session);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}