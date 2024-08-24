"use client";

import { useFetchProductDetailsQuery } from "@/services/api/product";
import { useParams } from "next/navigation";

import { Actions } from "./actions";

type HeaderProps = {
	heading?: string;
	count?: number;
};

export function Header({ heading, count }: HeaderProps) {
	const { productId } = useParams();

	const { data } = useFetchProductDetailsQuery(productId);

	return (
		<div className="mx-auto mt-2 flex w-full items-center justify-between gap-2">
			{heading && (
				<h1 className="align-middle text-3xl font-semibold leading-none tracking-tight">
					{heading} {count && `(${count})`}
				</h1>
			)}
			{data && <Actions product={data} />}
		</div>
	);
}
