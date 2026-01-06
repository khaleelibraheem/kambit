import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format number with commas while typing
export const formatNumberWithCommas = (value) => {
  const cleanValue = value.replace(/[^\d.]/g, "");

  const [wholePart, decimalPart] = cleanValue.split(".");

  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart !== undefined
    ? `${formattedWholePart}.${decimalPart}`
    : formattedWholePart;
};

// Parse formatted string back to number
export const parseFormattedNumber = (value) => {
  return parseFloat(value.replace(/,/g, ""));
};

// Format currency with proper decimals and commas
export const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    notation: amount > 999999 ? "compact" : "standard",
  }).format(amount);
};

// Format large numbers with commas and proper decimals
export const formatNumber = (value, decimals = 2) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};
