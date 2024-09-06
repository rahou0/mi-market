"use client";

import { enumToOptions, removeUndefinedProperties, toFormData } from "@/lib/utils";
import { Product, ProductType } from "@/models/product";
import { useEditProductMutation } from "@/services/api/product";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ImageUpload } from "@/components/image-upload";
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
	FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

type EditProductForm = {
	product: Product;
	open: boolean;
	onClose: () => void;
};
const typeOptions = enumToOptions(ProductType);

const formSchema = z.object({
	name: z.string().min(3),
	barCode: z.string(),
	description: z.string().optional(),
	price: z.coerce.number().min(0),
	type: z.nativeEnum(ProductType),
	image: z.any().optional(),
	imageUrl: z.string().optional(),
});

export function EditProductForm({ product, open, onClose }: Readonly<EditProductForm>) {
	const [editProduct, { isLoading }] = useEditProductMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: product.name,
			description: product.description,
			price: product.price,
			barCode: product.barCode,
			type: product.type,
			imageUrl: product.imageUrl,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		delete values.imageUrl;
		const formData = new FormData();
		toFormData(formData, removeUndefinedProperties({ ...values }));

		await editProduct({ id: product.id, payload: formData })
			.unwrap()
			.then(() => {
				onClose();
				toast({
					title: "Product updated successfully",
				});
			})
			.catch(() => {
				return toast({
					variant: "destructive",
					title: "Product failed to be updated",
					description: "Reason: Soooooon!",
				});
			});
	};

	return (
		<Dialog open={open}>
			<DialogContent className="max-h-svh overflow-y-scroll rounded-md border">
				<DialogHeader>
					<DialogTitle>Update Product</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-2">
						<FormField
							control={form.control}
							name="name"
							disabled={isLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{"Name"} *</FormLabel>
									<FormControl>
										<Input
											placeholder="Product name"
											{...field}
										/>
									</FormControl>
									<FormDescription>This is your public display name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>{"Image"}</FormLabel>
									<FormControl>
										<ImageUpload
											onBlur={field.onBlur}
											name={field.name}
											onChange={(e) => {
												if (e.target.files?.[0]) field.onChange(e.target.files[0]);
											}}
											oldImageUrl={form.getValues("imageUrl")}
											accept="image/*"
											id="image"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							disabled={isLoading}
							name="barCode"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{"Bar Code"} *</FormLabel>
									<FormControl>
										<Input
											placeholder="Product Bar Code"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							disabled={isLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{"Description"}</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Product description"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-start justify-start gap-2">
							<FormField
								control={form.control}
								name="price"
								disabled={isLoading}
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
							name="type"
							disabled={isLoading}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{"Type"} *</FormLabel>
									<Select
										value={field.value}
										onValueChange={(value) => field.onChange(value)}
										disabled={isLoading}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a type" />
											</SelectTrigger>
										</FormControl>

										<SelectContent
											position="popper"
											className="max-h-48"
											ref={field.ref}>
											{typeOptions.map((option) => (
												<SelectItem
													key={`type-${option.value}`}
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
								Update
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
