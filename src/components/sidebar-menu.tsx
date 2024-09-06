"use client";

import { cn } from "@/lib/utils";
import { Boxes, FileText, LayoutGrid, LucideIcon, Store, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MenuProps {
	isOpen: boolean | undefined;
}

type Submenu = {
	href: string;
	label: string;
	active: boolean;
};

type Menu = {
	href: string;
	label: string;
	active: boolean;
	icon: LucideIcon;
	submenus: Submenu[];
};

function getMenuList(pathname: string): Menu[] {
	return [
		{
			href: "/",
			label: "Dashboard",
			active: pathname === "/",
			icon: LayoutGrid,
			submenus: [],
		},
		{
			href: "/products",
			label: "Products",
			active: pathname.includes("/products"),
			icon: Boxes,
			submenus: [],
		},
		{
			href: "/vendors",
			label: "Vendors",
			active: pathname.includes("/vendors"),
			icon: Store,
			submenus: [],
		},
		{
			href: "/customers",
			label: "Customers",
			active: pathname.includes("/customers"),
			icon: Users,
			submenus: [],
		},
		{
			href: "/purchases",
			label: "Purchases",
			active: pathname.includes("/purchases"),
			icon: FileText,
			submenus: [],
		},
		{
			href: "/invoices",
			label: "Invoices",
			active: pathname.includes("/invoices"),
			icon: FileText,
			submenus: [],
		},
	];
}

export function Menu({ isOpen }: Readonly<MenuProps>) {
	const pathname = usePathname();
	const menuList: Menu[] = getMenuList(decodeURIComponent(pathname));

	return (
		<ScrollArea className="[&>div>div[style]]:!block">
			<nav className="w-full pt-8">
				<ul className="flex flex-col items-start space-y-1 px-2">
					{menuList.map(({ href, label, icon: Icon, active }) => (
						<li
							className="w-full"
							key={label}>
							<TooltipProvider disableHoverableContent>
								<Tooltip delayDuration={100}>
									<TooltipTrigger asChild>
										<Button
											variant={active ? "default" : "ghost"}
											className="mb-1 h-10 w-full justify-start hover:bg-primary"
											asChild>
											<Link href={href}>
												<span className={cn(isOpen ? "me-4" : "")}>
													<Icon
														size={18}
														className="text-primary-foreground"
													/>
												</span>
												<p
													className={cn(
														"max-w-[200px] truncate text-primary-foreground",
														isOpen ? "translate-x-0 opacity-100" : "-translate-x-96 opacity-0"
													)}>
													{label}
												</p>
											</Link>
										</Button>
									</TooltipTrigger>
									{!isOpen && <TooltipContent side="right">{label}</TooltipContent>}
								</Tooltip>
							</TooltipProvider>
						</li>
					))}
				</ul>
			</nav>
		</ScrollArea>
	);
}
