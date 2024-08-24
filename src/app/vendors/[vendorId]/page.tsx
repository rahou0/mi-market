import React from "react";

import { ContentLayout } from "@/components/layouts/content-layout";

import DataLoader from "./components/data-loader";
import { Header } from "./components/header";

const breadCrumbItems = [
	{ href: "/", label: "Dashboard" },
	{ href: "/vendors", label: "Vendors" },
	{ label: "Details" },
];

export default function ProductDetailsPage() {
	return (
		<ContentLayout
			title="Vendors Details"
			breadCrumbItems={breadCrumbItems}>
			<Header heading="Vendors Details" />
			<DataLoader />
		</ContentLayout>
	);
}
