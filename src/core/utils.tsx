import UserModel from "@/models/userModel";

export default function utils() {
  validateNoSpecialCharacters;
  validateEmail;
  checkPasswordLength;
  redirectWithDelay;
  ValidPhoneNumber;
}

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
