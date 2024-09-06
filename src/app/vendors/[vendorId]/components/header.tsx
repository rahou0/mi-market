"use client";

import { useFetchVendorDetailsQuery } from "@/services/api/vendor/vendor";
import { useParams } from "next/navigation";

import TablePageHeader from "@/components/shared/table-page-header";

import { Actions } from "./actions";

type HeaderProps = {
	heading?: string;
	count?: number;
};

export function Header({ heading, count }: Readonly<HeaderProps>) {
	const { vendorId } = useParams();

	const { data } = useFetchVendorDetailsQuery(vendorId);

	return (
		<TablePageHeader
			heading={heading}
			count={count}>
			{data && <Actions vendor={data} />}
		</TablePageHeader>
	);
}
