"use client";

import { useFetchVendorDetailsQuery } from "@/services/api/vendor/vendor";
import { useParams } from "next/navigation";

import { Actions } from "./actions";

type HeaderProps = {
	heading?: string;
	count?: number;
};

export function Header({ heading, count }: HeaderProps) {
	const { vendorId } = useParams();

	const { data } = useFetchVendorDetailsQuery(vendorId);

	return (
		<div className="mx-auto mt-2 flex w-full items-center justify-between gap-2">
			{heading && (
				<h1 className="align-middle text-3xl font-semibold leading-none tracking-tight">
					{heading} {count && `(${count})`}
				</h1>
			)}
			{data && <Actions vendor={data} />}
		</div>
	);
}
