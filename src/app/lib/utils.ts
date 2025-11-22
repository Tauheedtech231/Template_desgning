import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
/* eslint-disable */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// localStorage utilities for dynamic content
export const getCollegeInfo = () => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('collegeInfo');
  return data ? JSON.parse(data) : null;
};

export const updateCollegeInfo = (newData: any) => {
  if (typeof window === 'undefined') return;
  const currentData = getCollegeInfo() || {};
  const updatedData = { ...currentData, ...newData };
  localStorage.setItem('collegeInfo', JSON.stringify(updatedData));
};