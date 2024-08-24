import { Option } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string, currency?: string): string {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency ?? "DZD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formatter.format(price as number);
}

export function capitalizeString(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function enumToOptions(enumObject: any): Option[] {
	return Object.keys(enumObject).map((key) => ({
		label: capitalizeString(enumObject[key]),
		value: enumObject[key],
	}));
}
