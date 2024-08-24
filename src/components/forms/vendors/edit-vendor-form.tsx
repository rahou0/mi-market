"use client";

import { Vendor } from "@/models/vendor";
import { useEditVendorMutation } from "@/services/api/vendor/vendor";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { toast } from "@/components/ui/use-toast";

type EditVendorFormProps = {
	vendor: Vendor;
	open: boolean;
	onClose: () => void;
};

const formSchema = z.object({
	name: z.string().min(3),
	phone: z.string().min(10),
	email: z.string().email().optional(),
	city: z.string().optional(),
	address: z.string().optional(),
});

export function EditVendorForm({ vendor, open, onClose }: EditVendorFormProps) {
	const [editVendor, { isLoading }] = useEditVendorMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: vendor.name,
			phone: vendor.phone,
			email: vendor.email,
			address: vendor.address,
			city: vendor.city,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await editVendor({ id: vendor.id, ...values })
			.unwrap()
			.then(() => {
				onClose();
				toast({
					title: "Vendor updated successfully",
				});
			})
			.catch(() => {
				return toast({
					variant: "destructive",
					title: "Vendor failed to be updated",
					description: "Reason: Soooooon!",
				});
			});
	};

	return (
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Vendor</DialogTitle>
				</DialogHeader>
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
