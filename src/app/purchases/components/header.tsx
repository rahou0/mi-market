"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type HeaderProps = {
	heading?: string;
	count?: number;
};

export function Header({ heading, count }: Readonly<HeaderProps>) {
	const router = useRouter();

	return (
		<div className="mx-auto flex w-full items-center justify-between gap-2">
			{heading && (
				<h1 className="align-middle text-3xl font-semibold leading-none tracking-tight">
					{heading} {count && `(${count})`}
				</h1>
			)}
			<Button
				size="lg"
				onClick={() => router.push(`/purchases/add`, { scroll: true })}
				className="gap-2">
				<PlusCircle className="h-3.5 w-3.5" />
				{"Add Purchase"}
			</Button>
		</div>
	);
}
