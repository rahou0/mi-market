import { Product } from "@/models/product";
import { ApiResponse, ApiResponsePaginated } from "@/types/api-response";

import { baseApi } from "../base-api";

export const candidateApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		fetchProductsList: builder.query<ApiResponsePaginated<Product>, any>({
			query: ({ page = 0, limit = 20, ...props }) => {
				let url = `/v1/products?page=${page}&size=${limit}`;

				if (props.filters) {
					Object?.keys(props?.filters)?.forEach(function (key) {
						if (props.filters[key] !== "" && props.filters[key] !== null)
							url += `&${key}=${props.filters[key]}`;
					});
				}
				return url;
			},
			transformResponse: (response: ApiResponse<ApiResponsePaginated<Product>>) => {
				return response.results;
			},
			providesTags: ["products"],
			keepUnusedDataFor: 0,
		}),
		addProduct: builder.mutation<Product, any>({
			query: (payload) => ({
				url: "/v1/products",
				method: "POST",
				body: payload,
			}),
			transformResponse: (response: ApiResponse<Product>) => {
				return response.results;
			},
			invalidatesTags: (_, error) => (error ? [] : ["products"]),
		}),
	}),
});
export const { useFetchProductsListQuery, useAddProductMutation } = candidateApi;
