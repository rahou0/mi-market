"use client";

import { capitalizeString, formatDate, formatPrice } from "@/lib/utils";
import { Purchase, PurchaseStatus } from "@/models/purchase";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Badge, BadgeVariantProps } from "@/components/ui/badge";

import { Actions } from "./actions";

const statusVariantMap: Record<PurchaseStatus, BadgeVariantProps> = {
	[PurchaseStatus.PAID]: "success",
	[PurchaseStatus.NOT_PAID]: "destructive",
	[PurchaseStatus.PARTIALLY_PAID]: "warning",
};

export const columns: ColumnDef<Purchase>[] = [
	{
		id: "imageUrl",
		accessorKey: "vendor.imageUrl",
		header: "Image",
		cell: ({ row }) => {
			const value: string = row.original.vendor.imageUrl;
			const name: string = row.original.vendor.name;
			return (
				<Image
					src={value}
					width={80}
					height={50}
					alt={`${name} image`}
				/>
			);
		},
	},
	{
		id: "vendor",
		accessorKey: "vendor.name",
		header: "Vendor",
	},
	{
		id: "status",
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status: PurchaseStatus = row?.original?.status;
			const variant = statusVariantMap[status];
			return <Badge variant={variant}>{capitalizeString(status)}</Badge>;
		},
	},
	{
		id: "totalAmount",
		accessorKey: "totalAmount",
		header: "Total Amount",
		cell: ({ row }) => {
			const value: string = row.getValue("totalAmount");
			return formatPrice(value);
		},
	},
	{
		id: "createdAt",
		accessorKey: "createdAt",
		header: "Created qt",
		cell: ({ row }) => {
			const value = row.getValue<string>("createdAt");
			return formatDate(value);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return <Actions purchase={row.original} />;
		},
	},
];
