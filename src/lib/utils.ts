import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isOlderThan = (addedDate: string, TimeMS: number) => {
  const addedDateObj = new Date(addedDate);
  const currentDate = new Date();
  const diffInTime = currentDate.getTime() - addedDateObj.getTime();
  return diffInTime > TimeMS;
};
