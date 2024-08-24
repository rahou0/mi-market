import React from "react";

import { ContentLayout } from "@/components/layouts/content-layout";

import DataLoader from "./components/data-loader";
import { Header } from "./components/header";

const breadCrumbItems = [
	{ href: "/", label: "Dashboard" },
	{ href: "/products", label: "Products" },
	{ label: "Details" },
];

export default function ProductDetailsPage() {
	return (
		<ContentLayout
			title="Product Details"
			breadCrumbItems={breadCrumbItems}>
			<Header heading="Product Details" />
			<DataLoader />
		</ContentLayout>
	);
}
