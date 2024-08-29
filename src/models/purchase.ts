import { Product } from "./product";
import { Vendor } from "./vendor";

export enum PurchaseStatus {
	PAID = "paid",
	PARTIALLY_PAID = "partially paid",
	NOT_PAID = "not paid",
}

export type ProductPurchase = {
	product: Product;
	price: number;
	quantity: number;
	expiryDate?: Date;
};
export type Purchase = {
	id: string;
	vendor: Vendor;
	totalAmount: number;
	paidAmount: number;
	status: PurchaseStatus;
	products: ProductPurchase[];
	createdAt: Date;
	updatedAt: Date;
};
