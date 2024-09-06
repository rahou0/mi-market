"use client";

import { randomKeyGenerator } from "@/lib/utils";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Skeleton } from "./ui/skeleton";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading,
}: Readonly<DataTableProps<TData, TValue>>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										className="text-center">
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<>
							{Array.from({ length: 20 }).map((_, index) => (
								<TableRow key={randomKeyGenerator()}>
									{Array.from({ length: columns.length }).map((_, subIndex) => (
										<TableCell
											key={`row-${index}-cell-${subIndex}`}
											className="px-0 py-1">
											<Skeleton className="h-12 w-full rounded-none" />
										</TableCell>
									))}
								</TableRow>
							))}
						</>
					) : (
						<>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="text-center">
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center">
										{"No results."}
									</TableCell>
								</TableRow>
							)}
						</>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
