"use client";

import { Vendor } from "@/models/vendor";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Actions } from "./actions";

export const columns: ColumnDef<Vendor>[] = [
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
					width={50}
					height={50}
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
		id: "phone",
		accessorKey: "phone",
		header: "Phone",
	},
	{
		id: "email",
		accessorKey: "email",
		header: "Email",
	},
	{
		id: "address",
		accessorKey: "address",
		header: "Address",
	},
	{
		id: "city",
		accessorKey: "city",
		header: "City",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return <Actions vendor={row.original} />;
		},
	},
];
