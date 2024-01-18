import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export default function utils() {
  cn;
  validateNoSpecialCharacters;
  validateEmail;
  checkPasswordLength;
  redirectWithDelay;
  ValidPhoneNumber;
  formatDate;
  formatDateTime;
  formatTime;
  formatTime2;
  convertToDateTime;
  isNullOrEmpty;
  S4;
  newGuid;
  getOS;
  parseDateTime;
  parseDateTime2;
  trim;
  checkDataType;
  formatDateForInput;
  resizeImage;
}

// export function formatDateTime(dateString: string): string {
//   // Định nghĩa format ban đầu và format đích
//   const originalFormat = "MMMM dd, yyyy h:mm:ss aa";
//   const targetFormat = "dd/MM/yyyy h:mm:ss aa";

//   // Chuyển đổi string thành datetime object
//   const dateObj = parse(dateString, originalFormat, new Date());

//   // Chuyển đổi datetime object sang format mới
//   const formattedDate = format(dateObj, targetFormat);

//   return formattedDate;
// }
async function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 360;
      canvas.height = 360;

      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas to Blob failed"));
        }
      }, file.type);
    };

    img.onerror = () => reject(new Error("Image loading error"));
  });
}

export const formatDateForInput = (dateStr: string) => {
  const parts = dateStr.split("/"); // hoặc sử dụng định dạng phù hợp với dữ liệu của bạn
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`; // chuyển đổi từ DD/MM/YYYY sang YYYY-MM-DD
  }
  return dateStr;
};
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

export function formatDate(date: Date) {
  return moment(date).format("MM/DD/YYYY");
}

export function formatDateTime(datetime: Date) {
  return moment(datetime).format("MM/DD/YYYY hh:mm:ss A");
}

export function formatTime(datetime: Date) {
  return moment(datetime).format("hh:mm A");
  // return data type string
}

export function formatTime2(datetime: Date) {
  return moment(datetime).format("hh:mm:ss A");
  // return data type string
}

export function convertToDateTime(str: string) {
  let value = new Date(Date.parse(str));
  return value;
  // return data type string
}
export function isNullOrEmpty(str: string): boolean {
  if (str === null || str === undefined || str === "") return true;

  return false;
}

export function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function newGuid() {
  let guid = (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
  return guid;
}

export function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }

  return os;
}

function parseDateTime(str: any) {
  if (str === null || str === undefined || str === "") {
    return new Date(1900, 1, 1);
  }
  try {
    let y = str.substr(0, 4);
    let m = parseInt(str.substr(5, 2)) - 1;
    let d = str.substr(8, 2);
    let h = str.substr(11, 2);
    let min = str.substr(14, 2);
    let sec = str.substr(17, 2);

    let value = new Date(y, m, d, h, min, sec);

    return value;
  } catch {
    return str;
  }
}

function parseDateTime2(str: any) {
  if (str === null || str === undefined || str === "") {
    return new Date(1900, 1, 1);
  }

  try {
    let y = str.substr(0, 4);
    let m = parseInt(str.substr(5, 2)) - 1;
    let d = str.substr(8, 2);
    let h = str.substr(11, 2).replace(":", "");
    let min = str.substr(14, 2).replace(":", "");
    let sec = str.substr(17, 2).replace(":", "");

    let value = new Date(y, m, d, h, min, sec);

    return value;
  } catch {
    return str;
  }
}

function trim(str: string) {
  return str.replace(/^\s+|\s+$/gm, "");
}

function checkDataType(value: any): string {
  if (value instanceof Date && !isNaN(value.valueOf())) {
    return "Date";
  } else if (typeof value === "string") {
    return "string";
  } else if (typeof value === "number") {
    return "number";
  } else if (typeof value === "boolean") {
    return "boolean";
  } else {
    return "unknown";
  }
}
