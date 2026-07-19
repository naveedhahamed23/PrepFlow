import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/cn";

const Input = forwardRef(
  ({ label, error, icon: Icon, type = "text", className, containerClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && <label className="mb-1.5 block text-sm font-medium text-text-muted">{label}</label>}
        <div className="relative">
          {Icon && (
            <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
          )}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full rounded-xl border border-bg-border bg-bg-card px-4 py-2.5 text-sm text-text placeholder:text-text-muted/60 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              Icon && "pl-10",
              isPassword && "pr-10",
              error && "border-danger focus:border-danger focus:ring-danger/20",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
