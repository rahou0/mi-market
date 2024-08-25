"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import logo from "../../../public/images/logo.png";
import logo_collapsed from "../../../public/images/logo_collapsed.png";
import { Menu } from "../sidebar-menu";
import { useSidebarToggle } from "../sidebar-provider";

interface SidebarToggleProps {
	isOpen: boolean | undefined;
	setIsOpen: (isOpen: boolean) => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
	return (
		<div className="invisible absolute -end-[16px] top-[12px] z-20 lg:visible">
			<Button
				onClick={() => setIsOpen(!isOpen)}
				className="h-8 w-8 rotate-0 rounded-md rtl:rotate-180"
				variant="outline"
				size="icon">
				<ChevronLeft
					className={cn(
						"h-4 w-4 transition-transform duration-700 ease-in-out",
						isOpen ? "rotate-0" : "rotate-180"
					)}
				/>
			</Button>
		</div>
	);
}
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { isOpen, setIsOpen } = useSidebarToggle();

	return (
		<>
			<aside
				className={cn(
					"invisible fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:visible lg:translate-x-0",
					"bg-sidebar",
					isOpen ? "w-72" : "w-[90px]"
				)}>
				<SidebarToggle
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
				<div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
					<Button
						className={cn(
							"mb-1 transition-transform duration-300 ease-in-out",
							isOpen ? "translate-x-0" : "translate-x-1"
						)}
						variant="link"
						asChild>
						<Link
							href="/"
							className="flex items-center gap-2">
							<Image
								src={isOpen ? logo : logo_collapsed}
								width={isOpen ? 200 : 50}
								height={isOpen ? 50 : 20}
								alt="mi-market"
							/>
						</Link>
					</Button>
					<Menu isOpen={isOpen} />
				</div>
			</aside>
			<main
				className={cn(
					"min-h-[calc(100vh_-_56px)] duration-300 ease-in-out",
					isOpen ? "lg:ms-72" : "lg:ms-[90px]"
				)}>
				{children}
			</main>
		</>
	);
}
