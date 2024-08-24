export enum ProductType {
	BOX = "box",
	BAG = "bag",
	ITEM = "item",
}

export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	type: ProductType;
};
