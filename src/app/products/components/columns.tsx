"use client";

import { formatPrice } from "@/lib/utils";
import { Product } from "@/models/product";
import { ColumnDef } from "@tanstack/react-table";

import { Actions } from "./actions";

export const columns: ColumnDef<Product>[] = [
	{
		id: "name",
		accessorKey: "name",
		header: "Name",
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
			const type: string = row.getValue("type");
			return `x${quantity} ${type}`;
		},
	},
	{
		id: "description",
		accessorKey: "description",
		header: "Description",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return <Actions data={row.original} />;
		},
	},
];
