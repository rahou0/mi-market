import { Client, Types } from "@/client/lib";
import { ReadResponses } from "@/client/responses";
import { env } from "@/env.mjs";
import { UseQueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";

const token = () => ({
	jwt: localStorage.getItem("accessToken") ?? "",
});
const client = () => Client(env.NEXT_PUBLIC_API_BASE_URL, { type: "jwt", params: token() });

export const useRead = <
	T extends Types.ReadRequest["type"],
	R extends Extract<Types.ReadRequest, { type: T }>,
	P extends R["params"],
	C extends Omit<
		UseQueryOptions<ReadResponses[R["type"]], unknown, ReadResponses[R["type"]], (T | P)[]>,
		"queryFn" | "queryKey"
	>,
>(
	type: T,
	params: P,
	config?: C
) => {
	return useQuery({
		queryKey: [type, params],
		queryFn: () => client().read({ type, params } as unknown as R),
		throwOnError: (error: any) => {
			console.log("Auth error:", error?.response?.data);
			const msg = error?.response?.data?.error as string;
			let msg_log = msg ? msg + " | " : "";
			if (msg_log) {
				msg_log = msg_log[0].toUpperCase() + msg_log.slice(1);
			}
			console.log("title", `Request ${type} Failed`);
			console.log("description", `${msg_log}See console for details`);
			return false;
		},
		...config,
	});
};

export const useInvalidate = () => {
	const qc = useQueryClient();
	return <
		Type extends Types.ReadRequest["type"],
		Params extends Extract<Types.ReadRequest, { type: Type }>["params"],
	>(
		...keys: Array<[Type] | [Type, Params]>
	) => keys.forEach((key) => qc.invalidateQueries({ queryKey: key }));
};
