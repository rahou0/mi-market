import React from "react";

import { ContentLayout } from "@/components/layouts/content-layout";

import DataLoader from "./components/data-loader";
import { Filters } from "./components/filters";
import { Header } from "./components/header";

export type PurchasesPageProps = {
	searchParams: {
		search?: string;
	};
};
const breadCrumbItems = [{ href: "/", label: "Dashboard" }, { label: "Purchases" }];

export default function PurchasesPage({ searchParams }: PurchasesPageProps) {
	return (
		<ContentLayout
			title="Purchases"
			breadCrumbItems={breadCrumbItems}>
			<Header heading="Purchases" />
			<Filters />
			<DataLoader searchParams={searchParams} />
		</ContentLayout>
	);
}
