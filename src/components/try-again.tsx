"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import alertImage from "../../public/images/alert.svg";

export default function TryAgain({ reset }: Readonly<{ reset: () => void }>) {
	return (
		<div className="mt-10">
			<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed py-12 shadow-sm">
				<div className="flex flex-col items-center gap-12 text-center">
					<Image
						src={alertImage}
						alt="error"
						width={312}
						height={312}
					/>
					<h3 className="text-4xl font-bold tracking-tight">{"Something went wrong!"}</h3>
					<Button
						onClick={() => reset()}
						size="lg"
						variant="outline"
						className="mt-4 bg-transparent hover:text-primary-foreground">
						Try again
					</Button>
				</div>
			</div>
		</div>
	);
}
