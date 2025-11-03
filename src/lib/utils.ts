import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//generating avatar for added doctor profiles
export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const username = name.replace(/\s+/g, "").toLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  if (gender === "FEMALE") return `${base}/girl?username=${username}`;
  // default to boy
  return `${base}/boy?username=${username}`;
}

// phone formatting function for indian numbers
export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, "").replace(/^91/, "");

  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength <= 5) {
    return `+91 ${phoneNumber}`;
  }

  return `+91 ${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5, 10)}`;
};
