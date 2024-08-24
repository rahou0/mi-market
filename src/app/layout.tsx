import { getFontsClassnames } from "@/lib/font";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";

import "@/styles/globals.css";

import Providers from "./providers";

export const metadata: Metadata = {
	title: "Mi Market App",
	description: "The first Mi Market Saas Product In Algeria",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			dir="ltr">
			<body className={cn(getFontsClassnames())}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
