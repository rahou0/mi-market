"use client";

import { Purchase } from "@/models/purchase";
import { Eye, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ActionsProps = {
	purchase: Purchase;
};

export function Actions({ purchase }: Readonly<ActionsProps>) {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="h-8 w-8 p-0">
					<span className="sr-only">{"Open menu"}</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="text-start">
				<DropdownMenuLabel>{"Actions"}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => router.push(`/purchases/${purchase.id}`, { scroll: true })}
						className="hover:bg-card">
						<Eye className="me-2 h-4 w-4" />
						<span>{"View"}</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
