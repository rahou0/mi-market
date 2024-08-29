import { useFetchVendorsSlimQuery } from "@/services/api/vendor";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { FormControl } from "../ui/form";

type SelectVendorSlimProps = {
	field: ControllerRenderProps<any, "vendor">;
	disabled: boolean;
};
function SelectVendorSlim({ field, disabled }: SelectVendorSlimProps) {
	const { data, isLoading, isFetching } = useFetchVendorsSlimQuery({});

	return (
		<Select
			value={field.value}
			disabled={isFetching || isLoading || disabled}
			onValueChange={(value) => field.onChange(value)}>
			<FormControl>
				<SelectTrigger>
					<SelectValue placeholder="Select a Vendor" />
				</SelectTrigger>
			</FormControl>

			<SelectContent
				position="popper"
				className="max-h-48"
				ref={field.ref}>
				{data?.map((option) => (
					<SelectItem
						key={`vendor-${option.id}`}
						value={option.id}>
						{option.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export default SelectVendorSlim;
