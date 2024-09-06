"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import TablePageHeader from "@/components/shared/table-page-header";
import { Button } from "@/components/ui/button";

type HeaderProps = {
	heading?: string;
	count?: number;
};

export function Header({ heading, count }: Readonly<HeaderProps>) {
	const router = useRouter();

	return (
		<TablePageHeader
			heading={heading}
			count={count}>
			<Button
				size="lg"
				onClick={() => router.push(`/purchases/add`, { scroll: true })}
				className="gap-2">
				<PlusCircle className="h-3.5 w-3.5" />
				{"Add Purchase"}
			</Button>
		</TablePageHeader>
	);
}
