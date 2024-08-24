export interface ApiResponse<T> {
	statusCode: number;
	message?: string;
	results: T;
}

export interface ApiResponsePaginated<T> {
	totalItems: number;
	currentPage: number;
	totalPages: number;
	data: T[];
}
