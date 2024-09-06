"use client";

import { useFetchProductDetailsQuery } from "@/services/api/product";
import { useParams } from "next/navigation";

import TablePageHeader from "@/components/shared/table-page-header";

import { Actions } from "./actions";

type HeaderProps = {
	heading?: string;
	count?: number;
};

export function Header({ heading, count }: Readonly<HeaderProps>) {
	const { productId } = useParams();

	const { data } = useFetchProductDetailsQuery(productId);

	return (
		<TablePageHeader
			heading={heading}
			count={count}>
			{data && <Actions product={data} />}
		</TablePageHeader>
	);
}
