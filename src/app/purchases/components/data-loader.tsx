"use client";

import { useFetchPurchasesListQuery } from "@/services/api/purchase";
import React from "react";

import { DataTable } from "@/components/data-table";
import { Card, CardContent } from "@/components/ui/card";

import { PurchasesPageProps } from "../page";
import { columns } from "./columns";

type DataLoaderProps = PurchasesPageProps;

export default function DataLoader({ searchParams }: DataLoaderProps) {
	const { data, isLoading, isFetching } = useFetchPurchasesListQuery(searchParams);
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
