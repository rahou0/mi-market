"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type SideBarProviderProps = {
	children: React.ReactNode;
	// isOpen?: boolean;
};

type SideBarProviderState = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};

const initialState: SideBarProviderState = {
	isOpen: false,
	setIsOpen: () => null,
};

export const SideBarProviderContext = createContext<SideBarProviderState | undefined>(initialState);

const storageKey = "sidebarOpen";

export function SideBarProvider({ children }: SideBarProviderProps) {
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		const storedValue = localStorage.getItem(storageKey);
		if (storedValue) {
			setIsOpen(JSON.parse(storedValue));
		}
	}, []);
	const value = useMemo(
		() => ({
			isOpen,
			setIsOpen: (newState: boolean) => {
				localStorage.setItem(storageKey, JSON.stringify(newState));
				setIsOpen(newState);
			},
		}),
		[isOpen]
	);

	return (
		<SideBarProviderContext.Provider value={value}>{children}</SideBarProviderContext.Provider>
	);
}

export const useSidebarToggle = () => {
	const context = useContext(SideBarProviderContext);
	if (context === undefined)
		throw new Error("useSidebarToggle must be used within a SideBarProvider");

	return context;
};
