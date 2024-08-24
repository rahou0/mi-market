"use client";

import store from "@/services/store";
import { DirectionProvider } from "@radix-ui/react-direction";
import { Provider as ReduxProvider } from "react-redux";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { SideBarProvider } from "@/components/sidebar-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<DirectionProvider dir="ltr">
			<ThemeProvider defaultTheme="system">
				<ReduxProvider store={store}>
					<TooltipProvider>
						<SideBarProvider>
							<DashboardLayout>{children}</DashboardLayout>
						</SideBarProvider>
					</TooltipProvider>
				</ReduxProvider>
			</ThemeProvider>
		</DirectionProvider>
	);
}
