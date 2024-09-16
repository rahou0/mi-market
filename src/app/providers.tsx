"use client";

import store from "@/services/store";
import { DirectionProvider } from "@radix-ui/react-direction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import { SideBarProvider } from "@/components/sidebar-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const query_client = new QueryClient({
	defaultOptions: { queries: { retry: false } },
});

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryClientProvider client={query_client}>
			<DirectionProvider dir="ltr">
				<ThemeProvider defaultTheme="system">
					<ReduxProvider store={store}>
						<TooltipProvider>
							<SideBarProvider>
								<DashboardLayout>
									{children}
									<Toaster />
								</DashboardLayout>
							</SideBarProvider>
						</TooltipProvider>
					</ReduxProvider>
				</ThemeProvider>
			</DirectionProvider>
		</QueryClientProvider>
	);
}
