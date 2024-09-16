"use client";

import { useRead } from "@/lib/hooks";
import React from "react";

import { DataTable } from "@/components/data-table";
import { Card, CardContent } from "@/components/ui/card";

import { ProductsPageProps } from "../page";
import { columns } from "./columns";

type DataLoaderProps = ProductsPageProps;

export default function DataLoader({ searchParams }: Readonly<DataLoaderProps>) {
	const { data, isPending } = useRead("ListProducts", searchParams);
	return (
		<Card>
			<CardContent className="pt-6">
				<DataTable
					columns={columns}
					data={data?.data ?? []}
					isLoading={isPending}
				/>
			</CardContent>
		</Card>
	);
}
