import { Dialog } from "@radix-ui/react-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PlusCircle } from "lucide-react";

import { AddVendorForm } from "@/components/forms/vendors/add-vendor-form";
import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

type HeaderProps = {
	heading?: string;
	count?: number;
};

export function Header({ heading, count }: Readonly<HeaderProps>) {
	return (
		<div className="mx-auto flex w-full items-center justify-between gap-2">
			{heading && (
				<h1 className="align-middle text-3xl font-semibold leading-none tracking-tight">
					{heading} {count && `(${count})`}
				</h1>
			)}

			<Dialog>
				<DialogTrigger asChild>
					<Button
						size="lg"
						className="gap-2">
						<PlusCircle className="h-3.5 w-3.5" />
						{"Add Vendor"}
					</Button>
				</DialogTrigger>
				<DialogContent className="overflow-y-scroll rounded-md border">
					<DialogHeader>
						<DialogTitle>{"Add New Vendor"}</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<ScrollArea>
						<AddVendorForm />
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</div>
	);
}
