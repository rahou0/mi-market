import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "test", "staging", "production"]).default("development"),
	},
	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url().min(1),
	},
	shared: {},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	},
	skipValidation: false,
	emptyStringAsUndefined: true,
});
