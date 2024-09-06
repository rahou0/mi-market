import React from "react";

import { ContentLayout } from "@/components/layouts/content-layout";

import DataLoader from "./components/data-loader";
import { Filters } from "./components/filters";
import { Header } from "./components/header";

export type ProductsPageProps = {
	searchParams: {
		search?: string;
	};
};
const breadCrumbItems = [{ href: "/", label: "Dashboard" }, { label: "Products" }];

export default function ProductsPage({ searchParams }: Readonly<ProductsPageProps>) {
	return (
		<ContentLayout
			title="Products"
			breadCrumbItems={breadCrumbItems}>
			<Header heading="Products" />
			<Filters />
			<DataLoader searchParams={searchParams} />
		</ContentLayout>
	);
}
