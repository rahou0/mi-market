import React from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

type DialogButtonProps = {
	action: React.ReactNode;
	title: string;
	description?: string;
	children?: React.ReactNode;
};

function DialogButton({ action, title, description, children }: Readonly<DialogButtonProps>) {
	return (
		<Dialog>
			<DialogTrigger asChild>{action}</DialogTrigger>
			<DialogContent className="overflow-y-scroll rounded-md border">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<ScrollArea>{children}</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}

export default DialogButton;
