import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SocialLoginButtons from "../../components/auth/SocialLoginButtons";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      await login(formData);
      toast.success("Welcome back!");
      navigate(location.state?.from?.pathname || "/app/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to pick up your prep exactly where you left off.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          icon={Mail}
          placeholder="you@college.edu"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <Input
          label="Password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input type="checkbox" className="rounded border-bg-border accent-primary" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" loading={loading}>
          Log in
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-bg-border" />
        <span className="text-xs text-text-muted">or continue with</span>
        <div className="h-px flex-1 bg-bg-border" />
      </div>

      <SocialLoginButtons />

      <p className="mt-8 text-center text-sm text-text-muted">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-primary hover:underline">
          Sign up free
        </Link>
      </p>
    </AuthLayout>
  );
}
