"use client";

import { Product } from "@/models/product";
import { useDeleteProductMutation } from "@/services/api/product";
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

type DeleteProductDialogProps = {
	product: Product;
	open: boolean;
	onClose: () => void;
	onSuccess?: () => void;
};

export function DeleteProductDialog({
	product,
	open,
	onClose,
	onSuccess,
}: Readonly<DeleteProductDialogProps>) {
	const [deleteProduct, { isLoading }] = useDeleteProductMutation();

	const onConfirm = async () => {
		await deleteProduct(product.id)
			.unwrap()
			.then(() => {
				if (typeof onSuccess === "function") onSuccess();
				onClose();
				toast({
					title: "Product deleted successfully",
				});
			})
			.catch(() => {
				return toast({
					variant: "destructive",
					title: "Product failed to be deleted",
					description: "Reason: Soooooon!",
				});
			});
	};

	return (
		<AlertDialog open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Product</AlertDialogTitle>
					<AlertDialogDescription>
						{
							"Are you sure you want to delete this product from the inventory? This action cannot be undone."
						}
						<br />
						<br />
						<ul>
							<li>
								<strong>{"Product Name: "}</strong> {product.name}
							</li>
							<li>
								<strong>{"Product ID: "}</strong> {product.id}
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
