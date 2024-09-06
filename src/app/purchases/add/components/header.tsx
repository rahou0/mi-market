"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import TablePageHeader from "@/components/shared/table-page-header";
import { Button } from "@/components/ui/button";

type HeaderProps = {
	heading?: string;
};
export function Header({ heading }: Readonly<HeaderProps>) {
	const router = useRouter();
	const goBack = () => {
		router.back();
	};

	return (
		<TablePageHeader heading={heading}>
			<div className="flex gap-4">
				<Button
					onClick={goBack}
					className="h-8 w-8 rounded-md rtl:rotate-180"
					variant="outline"
					size="icon">
					<ArrowLeft className="h-4 w-4" />
				</Button>
				{heading && (
					<h1 className="align-middle text-3xl font-semibold leading-none tracking-tight">
						{heading}
					</h1>
				)}
			</div>
		</TablePageHeader>
	);
}
