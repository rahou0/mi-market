"use client";

import { capitalizeString, formatDate, formatPrice } from "@/lib/utils";
import { Purchase, PurchaseStatus } from "@/models/purchase";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";

import { Actions } from "./actions";

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
			const status = row?.original?.status;
			const variant =
				status === PurchaseStatus.PAID
					? "success"
					: status === PurchaseStatus.NOT_PAID
						? "destructive"
						: "warning";
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
