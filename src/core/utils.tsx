import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function utils() {
  cn;
  validateNoSpecialCharacters;
  validateEmail;
  checkPasswordLength;
  redirectWithDelay;
  ValidPhoneNumber;
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const validateNoSpecialCharacters = (input: string): boolean => {
  const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
  return !specialCharactersRegex.test(input);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function ValidPhoneNumber(phoneNumber: string): boolean {
  const regex = /^\d{10}$/;
  return regex.test(phoneNumber);
}

export const checkPasswordLength = (password: string): boolean => {
  return password.length >= 6;
};

export const redirectWithDelay = (url: string, delay: number = 0) => {
  setTimeout(() => {
    window.location.href = url;
  }, delay);
};

export function formatDate(date: any) {
  if (!date) return "";

  const d = new Date(date);
  let day = d.getDate().toString();
  let month = (d.getMonth() + 1).toString(); // Tháng trong JavaScript bắt đầu từ 0
  const year = d.getFullYear();

  day = day.length < 2 ? "0" + day : day;
  month = month.length < 2 ? "0" + month : month;

  return `${day}/${month}/${year}`;
}
