"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

import { Input } from "@/components/ui/input";

const SEARCH_QUERY = "search";

export function VendorsSearchFilter() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const [value, setValue] = useState<string>(searchParams?.get(SEARCH_QUERY) ?? "");

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const params = new URLSearchParams(searchParams);
		const value = event.target.value;
		if (value) {
			setValue(value);
			params.set(SEARCH_QUERY, value);
		} else {
			params.delete(SEARCH_QUERY);
			setValue("");
		}
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<Input
			size={30}
			placeholder={"Research"}
			value={value}
			onChange={handleChange}
			className="h-12 max-w-md bg-[#fff]"
		/>
	);
}
