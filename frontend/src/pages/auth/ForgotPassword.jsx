import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import authService from "../../services/authService";
import { useToast } from "../../context/ToastContext";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const toast = useToast();

  const onSubmit = async ({ email }) => {
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we'll send you a reset link.">
      {sent ? (
        <div className="rounded-2xl border border-success/20 bg-success/5 p-6 text-center">
          <CheckCircle2 size={32} className="mx-auto text-success" />
          <p className="mt-3 text-sm text-text">Check your inbox for a link to reset your password.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            icon={Mail}
            placeholder="you@college.edu"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />
          <Button type="submit" className="w-full" loading={loading}>
            Send reset link
          </Button>
        </form>
      )}

      <Link to="/login" className="mt-8 flex items-center justify-center gap-1.5 text-sm font-medium text-text-muted hover:text-text">
        <ArrowLeft size={14} /> Back to login
      </Link>
    </AuthLayout>
  );
}
