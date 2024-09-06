"use client";

import { useDialog } from "@/hooks/use-dialog";
import { Vendor } from "@/models/vendor";
import { ChevronDown, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { DeleteVendorDialog } from "@/components/dialogs/vendors/delete-vendor-dialog";
import { EditVendorForm } from "@/components/forms/vendors/edit-vendor-form";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ActionsProps = {
	vendor: Vendor;
};

export function Actions({ vendor }: Readonly<ActionsProps>) {
	const router = useRouter();
	const [openEdit, handleOpenEdit, handleCloseEdit] = useDialog();
	const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog();
	const onSuccess = () => {
		router.push("/vendors", { scroll: true });
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex items-center justify-center gap-2">
						<span>{"Actions"}</span>
						<ChevronDown className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="text-start">
					<DropdownMenuGroup>
						<DropdownMenuItem
							onClick={handleOpenEdit}
							className="hover:bg-card">
							<Pencil className="me-2 h-4 w-4" />
							<span>{"Edit"}</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={handleOpenDelete}>
							<Trash className="me-2 h-4 w-4 text-destructive" />
							<span className="text-destructive">{"Delete"}</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<EditVendorForm
				vendor={vendor}
				open={openEdit}
				onClose={handleCloseEdit}
			/>

			<DeleteVendorDialog
				vendor={vendor}
				open={openDelete}
				onClose={handleCloseDelete}
				onSuccess={onSuccess}
			/>
		</>
	);
}
