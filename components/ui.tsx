import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
export function Button({
  children,
  secondary = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { secondary?: boolean }) {
  return (
    <button
      {...props}
      className={`button ${secondary ? "secondary" : ""} ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}
export function SafetyNote({ children }: { children?: ReactNode }) {
  return (
    <div className="safety">
      <ShieldCheck size={26} aria-hidden="true" />
      <p>
        {children ?? (
          <>
            Sua segurança vem primeiro. Assistentes verificados e atendimento
            com respeito à sua autonomia.
          </>
        )}
      </p>
    </div>
  );
}
