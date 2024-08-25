"use client";

import { enumToOptions, removeUndefinedProperties, toFormData } from "@/lib/utils";
import { ProductType } from "@/models/product";
import { useAddProductMutation } from "@/services/api/product";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
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

const typeOptions = enumToOptions(ProductType);

const formSchema = z.object({
	name: z.string().min(3),
	barCode: z.string(),
	description: z.string().optional(),
	price: z.coerce.number().min(0),
	type: z.nativeEnum(ProductType),
	image: z.any().optional(),
});
export function AddProductForm() {
	const [addProduct, { isLoading }] = useAddProductMutation();
	const closeButtonRef = React.useRef<HTMLButtonElement>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			type: ProductType.ITEM,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const formData = new FormData();
		toFormData(formData, removeUndefinedProperties({ ...values }));
		await addProduct(formData)
			.unwrap()
			.then(() => {
				toast({
					title: "Product added successfully",
				});
				closeButtonRef?.current?.click();
			})
			.catch(() => {
				return toast({
					variant: "destructive",
					title: "Product failed to be added",
					description: "Reason: Soooooon!",
				});
			});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-2">
				<FormField
					control={form.control}
					name="name"
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
					render={({ field }) => (
						<FormItem>
							<FormLabel>{"Type"} *</FormLabel>
							<Select
								value={field.value}
								onValueChange={(value) => field.onChange(value)}>
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
					<DialogClose asChild>
						<Button
							ref={closeButtonRef}
							disabled={isLoading}
							variant="outline">
							Close
						</Button>
					</DialogClose>
					<Button
						disabled={isLoading}
						type="submit">
						Create
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
