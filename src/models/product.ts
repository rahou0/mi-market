export enum ProductType {
	BOX = "boxes",
	BAG = "bags",
	ITEM = "items",
	FARDEAU = "Fardeau",
}

export type Product = {
	id: string;
	name: string;
	barCode: string;
	description: string;
	price: number;
	quantity: number;
	type: ProductType;
	imageUrl: string;
};
