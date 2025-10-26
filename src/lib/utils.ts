import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Validate an email address with a reasonable regex.
 * Returns true when the value looks like an email.
 */
export function validateEmail(email?: string): boolean {
  if (!email) return false;
  // Simple RFC-ish email regex (not perfect but practical for forms)
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(email.trim());
}

/**
 * Validate a URL. Accepts empty/undefined as invalid.
 */
export function validateUrl(url?: string): boolean {
  if (!url) return false;
  try {
    // new URL will throw on invalid URLs; allow http/https only
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
