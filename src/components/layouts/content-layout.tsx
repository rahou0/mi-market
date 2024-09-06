"use client";

import { BreadCrumbItem } from "@/types";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

import { Menu } from "../sidebar-menu";

interface ContentLayoutProps {
	title: string;
	children: React.ReactNode;
	breadCrumbItems?: BreadCrumbItem[];
}

export function ContentLayout({ title, breadCrumbItems, children }: Readonly<ContentLayoutProps>) {
	return (
		<div>
			<header className="sticky top-0 z-10 w-full bg-zinc-50/40 shadow backdrop-blur dark:shadow-secondary">
				<div className="mx-4 flex h-14 items-center sm:mx-8">
					<div className="flex items-center space-x-4 lg:space-x-0 rtl:space-x-reverse">
						<Sheet>
							<SheetTrigger
								className="lg:hidden"
								asChild>
								<Button
									className="h-8"
									variant="outline"
									size="icon">
									<MenuIcon size={20} />
								</Button>
							</SheetTrigger>
							<SheetContent
								className="flex h-full flex-col bg-foreground px-3 sm:w-72"
								side="left">
								<SheetHeader>
									<Button
										className="flex items-center justify-center pb-2 pt-1"
										variant="link"
										asChild>
										<Link
											href="/"
											className="flex items-center gap-2">
											Mi Market
										</Link>
									</Button>
								</SheetHeader>
								<Menu isOpen />
							</SheetContent>
						</Sheet>
						<h1 className="font-bold">{title}</h1>
					</div>
				</div>
			</header>
			<div className="container flex flex-col gap-4 px-4 py-8 sm:px-8">
				{breadCrumbItems && breadCrumbItems.length > 0 && (
					<Breadcrumb>
						<BreadcrumbList>
							{breadCrumbItems.map((breadcrumb: BreadCrumbItem, index: number) => {
								return (
									<Fragment key={`breadcrumb-${breadcrumb.label}`}>
										<BreadcrumbItem>
											{breadcrumb.href ? (
												<BreadcrumbLink asChild>
													<Link href={breadcrumb.href}>{breadcrumb.label}</Link>
												</BreadcrumbLink>
											) : (
												<BreadcrumbPage className="cursor-default">
													{breadcrumb.label}
												</BreadcrumbPage>
											)}
										</BreadcrumbItem>
										{index < breadCrumbItems.length - 1 && (
											<BreadcrumbSeparator className="rtl:rotate-180" />
										)}
									</Fragment>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				)}

				{children}
			</div>
		</div>
	);
}
