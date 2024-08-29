import React from "react";

import { AddPurchaseForm } from "@/components/forms/purchases/add-purchase-form";
import { ContentLayout } from "@/components/layouts/content-layout";

import { Header } from "./components/header";

const breadCrumbItems = [
	{ href: "/", label: "Dashboard" },
	{ href: "/purchases", label: "Purchases" },
	{ label: "Add" },
];

export default function AddPurchasePage() {
	return (
		<ContentLayout
			title="Add Purchases"
			breadCrumbItems={breadCrumbItems}>
			<Header heading="Add Purchase" />
			<AddPurchaseForm />
		</ContentLayout>
	);
}
