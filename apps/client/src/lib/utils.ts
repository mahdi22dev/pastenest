import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: any) => {
  const options = { year: "numeric", month: "long" };
  // @ts-expect-error
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

export const formatExperationDate = (date: any) => {
  const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit" };

  const dateObj = new Date(date);
  // @ts-expect-error
  const formattedDate = new Intl.DateTimeFormat("en-GB", optionsDate).format(
    dateObj
  );
  // @ts-expect-error
  const formattedTime = new Intl.DateTimeFormat("en-GB", optionsTime).format(
    dateObj
  );

  return `${formattedTime} ${formattedDate}`;
};
