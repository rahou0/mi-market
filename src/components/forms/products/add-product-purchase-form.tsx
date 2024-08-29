"use client";

import { enumToOptions } from "@/lib/utils";
import { Product } from "@/models/product";
import { PurchaseStatus } from "@/models/purchase";
import { useAddPurchaseMutation } from "@/services/api/purchase";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import SelectVendorSlim from "@/components/slims/select-vendor-slim";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
import { toast } from "@/components/ui/use-toast";

type AddProductPurchaseFormProps = {
	product: Product;
	open: boolean;
	onClose: () => void;
};

const statusOptions = enumToOptions(PurchaseStatus);

const formSchema = z.object({
	product: z.string(),
	vendor: z.string(),
	quantity: z.coerce.number().min(0),
	price: z.coerce.number().min(0),
	status: z.nativeEnum(PurchaseStatus),
	paidAmount: z.coerce.number().min(0),
});
export function AddProductPurchaseForm({ product, open, onClose }: AddProductPurchaseFormProps) {
	const [addPurchase, { isLoading }] = useAddPurchaseMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			product: product.name,
			paidAmount: 0,
		},
	});
	const paymentStatus = useWatch({ name: "status", control: form.control });

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const payload = {
			vendor: values.vendor,
			status: values.status,
			paidAmount: values.paidAmount,
			products: [
				{
					product: product.id,
					price: values.price,
					quantity: values.quantity,
				},
			],
		};
		await addPurchase(payload)
			.unwrap()
			.then(() => {
				onClose();
				toast({
					title: "Product purchase added successfully",
				});
			})
			.catch(() => {
				return toast({
					variant: "destructive",
					title: "Product purchase failed to be added",
					description: "Reason: Soooooon!",
				});
			});
	};

	return (
		<Dialog open={open}>
			<DialogContent className="max-h-svh overflow-y-scroll rounded-md border">
				<DialogHeader>
					<DialogTitle>Add product purchase</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-2">
						<FormField
							control={form.control}
							name="product"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{"Product"} *</FormLabel>
									<FormControl>
										<Input
											placeholder="Product name"
											{...field}
											disabled
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="vendor"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{"Vendor"} *</FormLabel>
									<SelectVendorSlim
										field={field}
										disabled={isLoading}
									/>

									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-start justify-start gap-2">
							<FormField
								control={form.control}
								name="quantity"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>{"Quantity"} *</FormLabel>
										<FormControl>
											<Input
												placeholder="quantity"
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
								value={product.type}
								className="mt-8 w-14"
							/>
						</div>
						<div className="flex items-start justify-start gap-2">
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>{"Price"} *</FormLabel>
										<FormControl>
											<Input
												placeholder="price"
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
						{paymentStatus === PurchaseStatus.PARTIALLY_PAID && (
							<div className="flex items-start justify-start gap-2">
								<FormField
									control={form.control}
									name="paidAmount"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>{"Paid Amount"} *</FormLabel>
											<FormControl>
												<Input
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
						)}

						<DialogFooter className="pt-4">
							<Button
								onClick={onClose}
								disabled={isLoading}
								variant="outline"
								type="button">
								Close
							</Button>
							<Button
								disabled={isLoading}
								type="submit">
								Create
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
