"use client";

import { useFetchProductsListQuery } from "@/services/api/product";
import React from "react";

import { DataTable } from "@/components/data-table";
import { Card, CardContent } from "@/components/ui/card";

import { ProductsPageProps } from "../page";
import { columns } from "./columns";

type DataLoaderProps = ProductsPageProps;

export default function DataLoader({ searchParams }: Readonly<DataLoaderProps>) {
	const { data, isLoading, isFetching } = useFetchProductsListQuery(searchParams);
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
