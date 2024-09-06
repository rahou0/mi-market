import React from "react";

import { ContentLayout } from "@/components/layouts/content-layout";

import DataLoader from "./components/data-loader";
import { Filters } from "./components/filters";
import { Header } from "./components/header";

export type VendorsPageProps = {
	searchParams: {
		search?: string;
	};
};
const breadCrumbItems = [{ href: "/", label: "Dashboard" }, { label: "Vendors" }];

export default function VendorsPage({ searchParams }: Readonly<VendorsPageProps>) {
	return (
		<ContentLayout
			title="Vendors"
			breadCrumbItems={breadCrumbItems}>
			<Header heading="Vendors" />
			<Filters />
			<DataLoader searchParams={searchParams} />
		</ContentLayout>
	);
}
