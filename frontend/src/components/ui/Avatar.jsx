import { cn } from "../../utils/cn";
import { initials } from "../../utils/format";

const sizes = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-24 w-24 text-2xl",
};

export default function Avatar({ src, name = "", size = "md", className, online = false }) {
  return (
    <div className={cn("relative shrink-0", sizes[size], className)}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full rounded-full object-cover ring-2 ring-bg-border" />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-semibold text-white ring-2 ring-bg-border">
          {initials(name)}
        </div>
      )}
      {online && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-bg" />
      )}
    </div>
  );
}
