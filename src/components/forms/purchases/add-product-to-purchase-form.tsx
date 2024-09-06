"use client";

import { Product } from "@/models/product";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { ProductAutoCompleteSingleSelect } from "@/components/slims/product-autocomplete-single-select";
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

type AddProductToPurchaseFormProps = {
	open: boolean;
	onClose: () => void;
	onAdd: (data: any) => void;
	products: Product[];
};

const formSchema = z.object({
	product: z
		.object({
			type: z.string().optional(),
		})
		.optional(),
	quantity: z.coerce.number().min(0),
	price: z.coerce.number().min(0),
});
export function AddProductToPurchaseForm({
	open,
	onClose,
	onAdd,
	products,
}: Readonly<AddProductToPurchaseFormProps>) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});
	const product = useWatch({ name: "product", control: form.control });

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		onAdd({ ...values, product });
		onClose();
		form.reset();
	};

	return (
		<Dialog open={open}>
			<DialogContent className="max-h-svh overflow-y-scroll rounded-md border">
				<DialogHeader>
					<DialogTitle>Add product to purchase list</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-2">
						<FormField
							control={form.control}
							name="product"
							disabled
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>{"Product"} *</FormLabel>
									<FormControl>
										<ProductAutoCompleteSingleSelect
											isLoading={false}
											value={product}
											products={products}
											onValueChange={(value) => {
												field.onChange(value as Product);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-start justify-start gap-2">
							<FormField
								control={form.control}
								name="quantity"
								disabled={!product}
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
								value={product?.type ?? ""}
								className="mt-8 w-14"
							/>
						</div>
						<div className="flex items-start justify-start gap-2">
							<FormField
								control={form.control}
								name="price"
								disabled={!product}
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

						<DialogFooter className="pt-4">
							<Button
								onClick={onClose}
								variant="outline"
								type="button">
								Close
							</Button>
							<Button
								type="submit"
								disabled={!product}>
								Add
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
