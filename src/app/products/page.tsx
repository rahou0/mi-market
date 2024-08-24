import React from "react";

import { DataTable } from "@/components/data-table";
import { ContentLayout } from "@/components/layouts/content-layout";
import { Card, CardContent } from "@/components/ui/card";

import { columns } from "./components/columns";
import { Filters } from "./components/filters";
import { Header } from "./components/header";

const breadCrumbItems = [{ href: "/", label: "Dashboard" }, { label: "Products" }];

export default function ProductsPage() {
	return (
		<ContentLayout
			title="Items"
			breadCrumbItems={breadCrumbItems}>
			<Header heading="Products" />
			<Filters />
			<Card>
				<CardContent className="pt-6">
					<DataTable
						columns={columns}
						data={[]}
					/>
				</CardContent>
			</Card>
			<div />
		</ContentLayout>
	);
}
