"use client";

import { Vendor } from "@/models/vendor";
import { useDeleteVendorMutation } from "@/services/api/vendor/vendor";
import * as React from "react";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type DeleteVendorDialogProps = {
	vendor: Vendor;
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
};

export function DeleteVendorDialog({
	vendor,
	open,
	onClose,
	onSuccess,
}: Readonly<DeleteVendorDialogProps>) {
	const [deleteVendor, { isLoading }] = useDeleteVendorMutation();

	const onConfirm = async () => {
		await deleteVendor(vendor.id)
			.unwrap()
			.then(() => {
				if (typeof onSuccess === "function") onSuccess();
				onClose();
				toast({
					title: "Vendor deleted successfully",
				});
			})
			.catch(() => {
				return toast({
					variant: "destructive",
					title: "Vendor failed to be deleted",
					description: "Reason: Soooooon!",
				});
			});
	};

	return (
		<AlertDialog open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Vendor</AlertDialogTitle>
					<AlertDialogDescription>
						{
							"Are you sure you want to delete this Vendor from vendors list? This action cannot be undone."
						}
						<br />
						<br />
						<ul>
							<li>
								<strong>{"Vendor Name: "}</strong> {vendor.name}
							</li>
							<li>
								<strong>{"Vendor ID: "}</strong> {vendor.id}
							</li>
						</ul>
						<br />
						{"Please confirm your choice by clicking the appropriate button below."}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter className="pt-4">
					<Button
						onClick={onClose}
						disabled={isLoading}
						variant="outline"
						type="button">
						Close
					</Button>

					<Button
						disabled={isLoading}
						onClick={onConfirm}
						variant="destructive">
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
