"use client";

import { useFetchVendorDetailsQuery } from "@/services/api/vendor/vendor";
import { useParams } from "next/navigation";
import React from "react";

import NotFound from "@/app/not-found";

import VendorDetailsCard from "@/components/cards/vendors/vendor-details-card";
import LoadingCircle from "@/components/loading-circle";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DataLoader() {
	const { vendorId } = useParams();
	const { data, isLoading, isFetching } = useFetchVendorDetailsQuery(vendorId);
	if (isLoading || isFetching) return <LoadingCircle />;
	if (!data) return <NotFound />;
	return (
		<>
			<VendorDetailsCard vendor={data} />
			<Tabs
				defaultValue="overview"
				className="w-full">
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="purchases">Purchases</TabsTrigger>
					<TabsTrigger value="sales">Sales</TabsTrigger>
					<TabsTrigger value="history">History</TabsTrigger>
				</TabsList>
				<TabsContent value="overview">
					<Card></Card>
				</TabsContent>
				<TabsContent value="history">
					<Card></Card>
				</TabsContent>
			</Tabs>
		</>
	);
}
