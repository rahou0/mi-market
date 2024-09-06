import { Option } from "@/types";
import { type ClassValue, clsx } from "clsx";
import crypto from "crypto";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string, currency?: string): string {
	const formatter = new Intl.NumberFormat("fr-FR", {
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
interface ToFormDataArgs {
	[key: string]: any;
}

export function toFormData<T extends ToFormDataArgs>(formData: FormData, data: T, parentKey = "") {
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const value = data[key] as any;
			const formKey = parentKey ? `${parentKey}[${key}]` : key;
			if (value.from && value.to) {
				formData.append(formKey, value.from);
				formData.append(formKey, value.to);
			} else if (value instanceof Date) {
				formData.append(formKey, value.toString());
			} else if (value instanceof File) {
				formData.append(formKey, value);
			} else if (Array.isArray(value) && value.every((v) => typeof v === "object")) {
				value.forEach((item, index) => {
					toFormData(formData, item, `${formKey}[${index}]`);
				});
			} else if (typeof value === "object" && value !== null) {
				toFormData(formData, value, formKey);
			} else {
				formData.append(formKey, value);
			}
		}
	}
}
export function removeUndefinedProperties(obj: any) {
	if (obj === null || typeof obj !== "object" || obj instanceof File || (obj.from && obj.to)) {
		return obj;
	}

	const cleanedObj = Array.isArray(obj) ? [] : ({} as any);

	for (const [key, value] of Object.entries(obj)) {
		if (value === undefined || value === "") {
			continue;
		}
		cleanedObj[key] = removeUndefinedProperties(value);
	}

	return cleanedObj;
}

export const getFileBase64 = (file: File, callback: (result: string | null) => void) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
	reader.readAsDataURL(file);
};

export function formatDate(date: string | Date | null | undefined, withTime = true): string {
	const format = withTime ? "DD MMMM YYYY h:mm a" : "DD MMMM YYYY";
	return date ? dayjs(date).format(format) : "--";
}

export function randomKeyGenerator(): string {
	return crypto.randomUUID();
}
