export enum ProductType {
	BOX = "box",
	BAG = "bag",
	ITEM = "item",
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
