"use client";

import { Product } from "@/models/product";
import { useFetchProductsSlimQuery } from "@/services/api/product";
import * as React from "react";

import { AutoCompleteSingleSelect } from "../autocomplete-single-select";

type ProductAutoCompleteSingleSelectProps = {
	onValueChange?: (value: any) => void;
	isLoading?: boolean;
	value?: any;
	products: Product[];
};

export function ProductAutoCompleteSingleSelect(
	props: Readonly<ProductAutoCompleteSingleSelectProps>
) {
	const [inputValue, setInputValue] = React.useState<string>("");
	const { data, isLoading, isFetching } = useFetchProductsSlimQuery({ search: inputValue });
	return (
		<AutoCompleteSingleSelect
			options={data?.filter((product) => !props.products.find((p) => p.id === product.id)) ?? []}
			emptyMessage="No data available"
			onValueChange={props.onValueChange}
			isLoading={props.isLoading || isLoading || isFetching}
			placeholder="Type to search"
			setInputValue={setInputValue}
			inputValue={inputValue}
			value={props.value}
		/>
	);
}
