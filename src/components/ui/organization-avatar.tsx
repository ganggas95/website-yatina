"use client";

import Image from "next/image";
import Avatar from "react-avatar";

import { cn } from "@/lib/utils";

interface OrganizationAvatarProps {
  name: string;
  image?: string;
  size: number;
  className?: string;
  imageClassName?: string;
  fallbackName?: string;
}

function isValidOrganizationImage(image?: string) {
  if (!image) {
    return false;
  }

  const normalized = image.trim();

  if (!normalized) {
    return false;
  }

  if (normalized === "/images/" || normalized === "/images") {
    return false;
  }

  return true;
}

function getFallbackName(name: string, fallbackName?: string) {
  if (fallbackName?.trim()) {
    return fallbackName.trim();
  }

  const normalized = name.trim();

  if (!normalized || normalized === "Menunggu verifikasi") {
    return "Menunggu Info";
  }

  return normalized;
}

export function OrganizationAvatar({
  name,
  image,
  size,
  className,
  imageClassName,
  fallbackName,
}: OrganizationAvatarProps) {
  const hasValidImage = isValidOrganizationImage(image);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl bg-primary-50 ring-1 ring-primary-100",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {hasValidImage ? (
        <Image
          src={image!.trim()}
          alt={name}
          width={size}
          height={size}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      ) : (
        <Avatar
          name={getFallbackName(name, fallbackName)}
          round="12px"
          size={String(size)}
          maxInitials={2}
          color="#E8F2EC"
          fgColor="#0F5B3A"
          textSizeRatio={2}
          style={{ display: "flex" }}
        />
      )}
    </div>
  );
}
