import Image from "next/image";
import Link from "next/link";

import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";

import notFoundImage from "../../public/images/error.svg";

export default function NotFound() {
	return (
		<ContentLayout title={""}>
			<div className="mt-10">
				<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed py-12 shadow-sm">
					<div className="flex flex-col items-center gap-4 text-center">
						<h3 className="text-4xl font-bold tracking-tight">{"Page not found"}</h3>
						<Image
							src={notFoundImage}
							alt="error"
							width={156}
							height={156}
						/>

						<p className="m max-w-md text-base text-muted-foreground">
							{"Oops! That Page you requested is Missing"}
						</p>
						<Button
							asChild
							size="lg"
							variant="outline"
							className="mt-4 bg-transparent hover:text-primary-foreground">
							<Link href="/">{"TAKE ME HOME"}</Link>
						</Button>
					</div>
				</div>
			</div>
		</ContentLayout>
	);
}
