"use client";

import { useFetchVendorsListQuery } from "@/services/api/vendor/vendor";
import React from "react";

import { DataTable } from "@/components/data-table";
import { Card, CardContent } from "@/components/ui/card";

import { VendorsPageProps } from "../page";
import { columns } from "./columns";

type DataLoaderProps = VendorsPageProps;

export default function DataLoader({ searchParams }: DataLoaderProps) {
	const { data, isLoading, isFetching } = useFetchVendorsListQuery(searchParams);
	return (
		<Card>
			<CardContent className="pt-6">
				<DataTable
					columns={columns}
					data={data?.data ?? []}
					isLoading={isLoading || isFetching}
				/>
			</CardContent>
		</Card>
	);
}
