import { Vendor } from "@/models/vendor";
import { ApiResponsePaginated } from "@/types/api-response";

import { baseApi } from "../base-api";

export const vendorApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		fetchVendorsList: builder.query<ApiResponsePaginated<Vendor>, any>({
			query: ({ page = 1, limit = 20, ...props }) => {
				let url = `/v1/vendors?page=${page}&size=${limit}`;

				if (props) {
					Object?.keys(props)?.forEach(function (key) {
						if (props[key] !== "" && props[key] !== null) url += `&${key}=${props[key]}`;
					});
				}
				return url;
			},
			providesTags: ["vendors"],
			keepUnusedDataFor: 0,
		}),
		fetchVendorDetails: builder.query<Vendor, any>({
			query: (id) => `/v1/vendors/${id}`,
			providesTags: ["vendor"],
			keepUnusedDataFor: 0,
		}),
		editVendor: builder.mutation<Vendor, any>({
			query: ({ id, ...payload }) => ({
				url: `/v1/vendors/${id}`,
				method: "PUT",
				body: payload,
			}),
			invalidatesTags: (_, error) => (error ? [] : ["vendors", "vendor"]),
		}),
		addVendor: builder.mutation<Vendor, any>({
			query: (payload) => ({
				url: "/v1/vendors",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: (_, error) => (error ? [] : ["vendors", "vendor"]),
		}),
		deleteVendor: builder.mutation<Vendor, any>({
			query: (id) => ({
				url: `/v1/vendors/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (_, error) => (error ? [] : ["vendors", "vendor"]),
		}),
	}),
});
export const {
	useAddVendorMutation,
	useDeleteVendorMutation,
	useFetchVendorDetailsQuery,
	useEditVendorMutation,
	useFetchVendorsListQuery,
} = vendorApi;
