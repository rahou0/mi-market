"use client";

import { removeUndefinedProperties, toFormData } from "@/lib/utils";
import { useAddVendorMutation } from "@/services/api/vendor/vendor";
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
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
	name: z.string().min(3),
	phone: z.string().min(10),
	email: z.string().email().optional(),
	city: z.string().optional(),
	address: z.string().optional(),
	image: z.any().optional(),
});
export function AddVendorForm() {
	const [addVendor, { isLoading }] = useAddVendorMutation();
	const closeButtonRef = React.useRef<HTMLButtonElement>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const formData = new FormData();
		toFormData(formData, removeUndefinedProperties({ ...values }));
		await addVendor(formData)
			.unwrap()
			.then(() => {
				closeButtonRef?.current?.click();
				toast({
					title: "Vendor added successfully",
				});
			})
			.catch(() => {
				return toast({
					variant: "destructive",
					title: "Vendor failed to be added",
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
									placeholder="Vendor name"
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
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{"Phone"} *</FormLabel>
							<FormControl>
								<Input
									placeholder="Vendor Phone number"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{"Email"}</FormLabel>
							<FormControl>
								<Input
									placeholder="Vendor Email"
									{...field}
									type="email"
								/>
							</FormControl>
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
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{"Address"}</FormLabel>
							<FormControl>
								<Input
									placeholder="Vendor address"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{"City"}</FormLabel>
							<FormControl>
								<Input
									placeholder="Vendor City"
									{...field}
								/>
							</FormControl>
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
