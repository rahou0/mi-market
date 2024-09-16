export interface PaginatedResponse<T> {
	totalItems: number;
	currentPage: number;
	totalPages: number;
	data: T[];
}

export enum ProductType {
	BOX = "boxes",
	BAG = "bags",
	ITEM = "items",
	FARDEAU = "Fardeau",
}
export interface Product {
	id: string;
	name: string;
	barCode: string;
	description: string;
	price: number;
	quantity: number;
	type: ProductType;
	imageUrl: string;
}

export interface ListProducts {
	search?: string;
}
export type ListProductsResponse = PaginatedResponse<Product>;

// READ REQUESTS
export type ReadRequest = { type: "ListProducts"; params: ListProducts };

// DELETE REQUESTS

// UPDATE REQUESTS

// CREATE REQUESTS

// READ RESPONSES
export type ReadResponses = {
	ListProducts: ListProductsResponse;
};

// DELETE RESPONSES

// UPDATE RESPONSES

// CREATE RESPONSES

//URLS
export const urls = { ListProducts: "/v1/productsss" };
