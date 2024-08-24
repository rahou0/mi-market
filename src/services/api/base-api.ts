import { env } from "@/env.mjs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;

export const baseQuery = fetchBaseQuery({
	baseUrl: API_BASE_URL,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});
export const baseApi = createApi({
	baseQuery: baseQuery,
	tagTypes: ["products", "product", "vendors", "vendor"],
	endpoints: () => ({}),
});
