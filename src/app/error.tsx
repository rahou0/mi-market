"use client";

import { useEffect } from "react";

import { ContentLayout } from "@/components/layouts/content-layout";
import TryAgain from "@/components/try-again";

export default function ErrorPage({
	error,
	reset,
}: Readonly<{
	error: Error & { digest?: string };
	reset: () => void;
}>) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<ContentLayout>
			<TryAgain reset={reset} />
		</ContentLayout>
	);
}
