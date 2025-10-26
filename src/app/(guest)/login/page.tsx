
import { LoginInner } from "@/src/features/auth/components/login-inner";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-slate-800">Cargando…</h2>
          </div>
        </div>
      }
    >
      <LoginInner />
    </Suspense>
  );
}