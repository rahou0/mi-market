import axios from "axios";

import { ReadRequest, ReadResponses, urls } from "./types";

export * as Types from "./types";

type InitOptions = { type: "jwt"; params: { jwt: string } };

export function Client(url: string, options: InitOptions) {
	const state = {
		jwt: options.type === "jwt" ? options.params.jwt : undefined,
	};

	const request = async <Req extends { params?: Record<string, any> }, Res>(
		method: "GET" | "POST",
		path: string,
		request: Req
	) => {
		const config = {
			method,
			url: url + path,
			headers: {
				Authorization: `Bearer ${state.jwt}`,
			},
			// Only attach data for POST requests
			...(method === "POST" ? { data: request["params"] } : {}),
			// Attach params for GET requests
			...(method === "GET" ? { params: request["params"] } : {}),
		};

		// Perform the axios request
		return await axios<Res>(config).then(({ data }) => data);
	};

	const read = async <Req extends ReadRequest>(req: Req) =>
		await request<Req, ReadResponses[Req["type"]]>("GET", urls[req["type"]], req);

	return { request, read };
}
