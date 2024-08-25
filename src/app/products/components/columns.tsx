"use client";

import { capitalizeString, formatPrice } from "@/lib/utils";
import { Product } from "@/models/product";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Actions } from "./actions";

export const columns: ColumnDef<Product>[] = [
	{
		id: "imageUrl",
		accessorKey: "imageUrl",
		header: "Image",
		cell: ({ row }) => {
			const value: string = row.getValue("imageUrl");
			const name: string = row.original.name;
			return (
				<Image
					src={value}
					width={100}
					height={100}
					alt={`${name} image`}
				/>
			);
		},
	},
	{
		id: "name",
		accessorKey: "name",
		header: "Name",
	},
	{
		id: "barCode",
		accessorKey: "barCode",
		header: "Bar Code",
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
			const type: string = row.original.type;
			return `x${quantity} ${capitalizeString(type)}`;
		},
	},
	// {
	// 	id: "description",
	// 	accessorKey: "description",
	// 	header: "Description",
	// 	cell: ({ row }) => {
	// 		const value: string = row.getValue("description");
	// 		return <p className="line-clamp-3 text-justify">{value}</p>;
	// 	},
	// },
	{
		id: "actions",
		cell: ({ row }) => {
			return <Actions product={row.original} />;
		},
	},
];
