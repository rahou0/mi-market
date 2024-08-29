import { Product } from "@/models/product";
import { Purchase } from "@/models/purchase";
import { ApiResponsePaginated } from "@/types/api-response";

import { baseApi } from "../base-api";

export const purchaseApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		addProductPurchase: builder.mutation<Product, any>({
			query: (payload) => ({
				url: "/v1/purchases/product",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: (_, error) => (error ? [] : ["products", "product"]),
		}),
		addPurchase: builder.mutation<Product, any>({
			query: (payload) => ({
				url: "/v1/purchases",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: (_, error) =>
				error ? [] : ["products", "product", "purchase", "purchases"],
		}),
		fetchPurchasesList: builder.query<ApiResponsePaginated<Purchase>, any>({
			query: ({ page = 1, limit = 20, ...props }) => {
				let url = `/v1/purchases?page=${page}&size=${limit}`;

				if (props) {
					Object?.keys(props)?.forEach(function (key) {
						if (props[key] !== "" && props[key] !== null) url += `&${key}=${props[key]}`;
					});
				}
				return url;
			},
			providesTags: ["purchases"],
			keepUnusedDataFor: 0,
		}),
	}),
});
export const { useAddProductPurchaseMutation, useAddPurchaseMutation, useFetchPurchasesListQuery } =
	purchaseApi;
