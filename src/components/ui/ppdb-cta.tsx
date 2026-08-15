import { Button } from "./button";
import { GraduationCap } from "lucide-react";

interface PPDBCTAProps {
  label?: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PPDBCTA({
  label = "Informasi PPDB",
  variant = "primary",
  size = "md",
  className,
}: PPDBCTAProps) {
  return (
    <Button
      href="/ppdb"
      variant={variant}
      size={size}
      leftIcon={<GraduationCap className="h-4 w-4" />}
      className={className}
    >
      {label}
    </Button>
  );
}
