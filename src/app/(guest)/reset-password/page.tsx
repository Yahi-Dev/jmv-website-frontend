import { Suspense } from "react";
import ResetPasswordForm from "@/src/features/auth/components/reset-password";

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}