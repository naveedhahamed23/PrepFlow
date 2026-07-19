import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import SocialLoginButtons from "../../components/auth/SocialLoginButtons";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      await registerUser(formData);
      toast.success("Account created. Let's get you set up!");
      navigate("/app/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start tracking your prep in under two minutes.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          icon={User}
          placeholder="Aarav Sharma"
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
        />
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
        <Input
          label="Confirm password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (v) => v === watch("password") || "Passwords do not match",
          })}
        />

        <label className="flex items-start gap-2 text-xs text-text-muted">
          <input type="checkbox" required className="mt-0.5 rounded border-bg-border accent-primary" />
          I agree to the Terms of Service and Privacy Policy.
        </label>

        <Button type="submit" className="w-full" loading={loading}>
          Create account
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-bg-border" />
        <span className="text-xs text-text-muted">or continue with</span>
        <div className="h-px flex-1 bg-bg-border" />
      </div>

      <SocialLoginButtons />

      <p className="mt-8 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
