// src/lib/client-auth.ts
'use client';

import { authClient } from "./auth-client";

export async function getClientSession() {
  try {
    const { data: session } = await authClient.getSession();
    return session;
  } catch (error) {
    console.error("Error getting client session:", error);
    return null;
  }
}

export async function getClientUser() {
  const session = await getClientSession();
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


export async function signOut() {
  try {
    const { error } = await authClient.signOut();
    if (error) throw error;
    
    window.location.href = "/";
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
}