"use client";

import { capitalizeString, formatPrice } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<any>[] = [
	{
		id: "imageUrl",
		accessorKey: "product.imageUrl",
		header: "Image",
		cell: ({ row }) => {
			const value: string = row.original.product?.imageUrl;
			const name: string = row.original.product?.name;
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
		id: "product",
		accessorKey: "product.name",
		header: "Product",
	},
	{
		id: "price",
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			const value: string = row.getValue("price");
			return formatPrice(value);
		},
	},
	{
		id: "quantity",
		accessorKey: "quantity",
		header: "Quantity",
		cell: ({ row }) => {
			const quantity: string = row.getValue("quantity");
			const type: string = row.original.product.type;
			return `x${quantity} ${capitalizeString(type)}`;
		},
	},
	{
		id: "totalAmount",
		header: "Total Amount",
		cell: ({ row }) => {
			const quantity: number = row.getValue("quantity");
			const price: number = row.getValue("price");
			return formatPrice(quantity * price);
		},
	},
	{
		id: "actions",
		cell: () => {
			return <div />;
		},
	},
];
