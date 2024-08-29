import { Product } from "@/models/product";
import { ApiResponsePaginated } from "@/types/api-response";

import { baseApi } from "../base-api";

export const productApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		fetchProductsList: builder.query<ApiResponsePaginated<Product>, any>({
			query: ({ page = 1, limit = 20, ...props }) => {
				let url = `/v1/products?page=${page}&size=${limit}`;

				if (props) {
					Object?.keys(props)?.forEach(function (key) {
						if (props[key] !== "" && props[key] !== null) url += `&${key}=${props[key]}`;
					});
				}
				return url;
			},
			providesTags: ["products"],
			keepUnusedDataFor: 0,
		}),
		fetchProductsSlim: builder.query<Product[], any>({
			query: ({ search }) => `/v1/products/slim?search=${search}`,
			providesTags: ["products-slim"],
			keepUnusedDataFor: 0,
		}),
		fetchProductDetails: builder.query<Product, any>({
			query: (id) => `/v1/products/${id}`,
			providesTags: ["product"],
			keepUnusedDataFor: 0,
		}),
		editProduct: builder.mutation<Product, any>({
			query: (data) => ({
				url: `/v1/products/${data.id}`,
				method: "PUT",
				body: data.payload,
				formData: true,
			}),
			invalidatesTags: (_, error) => (error ? [] : ["products", "product", "products-slim"]),
		}),
		addProduct: builder.mutation<Product, any>({
			query: (payload) => ({
				url: "/v1/products",
				method: "POST",
				body: payload,
				formData: true,
			}),
			invalidatesTags: (_, error) => (error ? [] : ["products", "product", "products-slim"]),
		}),
		deleteProduct: builder.mutation<Product, any>({
			query: (id) => ({
				url: `/v1/products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (_, error) => (error ? [] : ["products", "product", "products-slim"]),
		}),
	}),
});
export const {
	useFetchProductsListQuery,
	useAddProductMutation,
	useDeleteProductMutation,
	useEditProductMutation,
	useFetchProductDetailsQuery,
	useFetchProductsSlimQuery,
} = productApi;
