import { PlusCircle } from "lucide-react";

import { AddProductForm } from "@/components/forms/products/add-product-form";
import DialogButton from "@/components/shared/dialog-button";
import TablePageHeader from "@/components/shared/table-page-header";
import { Button } from "@/components/ui/button";

type HeaderProps = {
	heading?: string;
	count?: number;
};

export function Header({ heading, count }: Readonly<HeaderProps>) {
	return (
		<TablePageHeader
			heading={heading}
			count={count}>
			<DialogButton
				action={
					<Button
						size="lg"
						className="gap-2">
						<PlusCircle className="h-3.5 w-3.5" />
						{"Add Product"}
					</Button>
				}
				title={"Add New Product"}>
				<AddProductForm />
			</DialogButton>
		</TablePageHeader>
	);
}
