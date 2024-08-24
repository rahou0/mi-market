export interface ApiResponse<T> extends T {
	errorCode?: string;
	message?: string;
	statusCode?: number;
}

export interface ApiResponsePaginated<T> {
	totalItems: number;
	currentPage: number;
	totalPages: number;
	data: T[];
}
