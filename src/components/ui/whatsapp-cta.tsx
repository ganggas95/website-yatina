import { Button } from "./button";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn, TODO_CONTENT } from "@/lib/utils";

interface WhatsAppCTAProps {
  label?: string;
  variant?: "primary" | "whatsapp" | "outline";
  size?: "sm" | "md" | "lg";
  message?: string;
  phoneNumber?: string;
  className?: string;
}

export function WhatsAppCTA({
  label = "Hubungi via WhatsApp",
  variant = "whatsapp",
  size = "md",
  message = "Assalamualaikum, saya ingin bertanya mengenai...",
  phoneNumber,
  className,
}: WhatsAppCTAProps) {
  const waNumber = phoneNumber ?? siteConfig.contact.whatsapp;
  const isPlaceholder = waNumber === TODO_CONTENT;

  const href = isPlaceholder
    ? "#"
    : `https://wa.me/${String(waNumber).replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      leftIcon={<MessageCircle className="h-4 w-4" />}
      className={cn(isPlaceholder && "pointer-events-none opacity-70", className)}
      aria-label={isPlaceholder ? "Nomor WhatsApp belum tersedia" : label}
    >
      {label}
      {isPlaceholder && (
        <span className="sr-only"> (nomor belum tersedia)</span>
      )}
    </Button>
  );
}
