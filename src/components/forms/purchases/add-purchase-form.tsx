"use client";

import { useDialog } from "@/hooks/use-dialog";
import { enumToOptions } from "@/lib/utils";
import { Product } from "@/models/product";
import { PurchaseStatus } from "@/models/purchase";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { columns } from "@/app/purchases/add/components/columns";

import { DataTable } from "@/components/data-table";
import SelectVendorSlim from "@/components/slims/select-vendor-slim";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { AddProductToPurchaseForm } from "./add-product-to-purchase-form";

const statusOptions = enumToOptions(PurchaseStatus);

const formSchema = z.object({
	vendor: z.string(),
	status: z.nativeEnum(PurchaseStatus),
	paidAmount: z.coerce.number().min(0),
	products: z.array(
		z.object({
			product: z.object({}),
			quantity: z.coerce.number().min(0),
			price: z.coerce.number().min(0),
		})
	),
});
export function AddPurchaseForm() {
	const [openAdd, handleOpenAdd, handleCloseAdd] = useDialog();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			paidAmount: 0,
			products: [],
		},
	});
	const { append } = useFieldArray({
		control: form.control,
		name: "products",
	});
	const paymentStatus = useWatch({ name: "status", control: form.control });
	const products = useWatch({ name: "products", control: form.control });
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log("values", values);
	};

	const onAdd = async (values: any) => {
		append(values);
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8">
					<Card>
						<CardHeader className="flex-row items-center justify-between">
							<CardTitle>{"Purchase General Information"}</CardTitle>
							<Button onClick={handleOpenAdd}>{"+ Add Product"}</Button>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-3 gap-4">
								<FormField
									control={form.control}
									name="vendor"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{"Vendor"} *</FormLabel>
											<SelectVendorSlim
												field={field}
												disabled={false}
											/>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{"Payment Status"} *</FormLabel>
											<Select
												value={field.value}
												onValueChange={(value) => field.onChange(value)}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a Payment Status" />
													</SelectTrigger>
												</FormControl>

												<SelectContent
													position="popper"
													className="max-h-48"
													ref={field.ref}>
													{statusOptions.map((option) => (
														<SelectItem
															key={`status-${option.value}`}
															value={option.value}>
															{option.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex items-start justify-start gap-2">
									<FormField
										control={form.control}
										name="paidAmount"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>{"Paid Amount"} *</FormLabel>
												<FormControl>
													<Input
														disabled={paymentStatus !== PurchaseStatus.PARTIALLY_PAID}
														placeholder="paid amount"
														type="number"
														className="w-full"
														min="0"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Input
										disabled
										value="DZD"
										className="mt-8 w-14"
									/>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="pt-6">
							<DataTable
								columns={columns}
								data={products}
							/>
						</CardContent>
					</Card>
					<DialogFooter className="pt-4">
						<Button variant="outline">Close</Button>

						<Button type="submit">Create</Button>
					</DialogFooter>
				</form>
			</Form>
			<AddProductToPurchaseForm
				onClose={handleCloseAdd}
				onAdd={onAdd}
				open={openAdd}
				products={(products?.map(({ product }) => product) ?? []) as Product[]}
			/>
		</>
	);
}
