import { cn } from "@/lib/utils";
import { Option } from "@/types";
import { Command as CommandPrimitive } from "cmdk";
import { Check } from "lucide-react";
import { type KeyboardEvent, useCallback, useRef, useState } from "react";

import { CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Skeleton } from "./ui/skeleton";

type AutoCompleteSingleSelectProps = {
	options: any[];
	emptyMessage: string;
	value?: any;
	onValueChange?: (value: any) => void;
	isLoading?: boolean;
	disabled?: boolean;
	placeholder?: string;
	inputValue: string;
	setInputValue: (value: string) => void;
};

export const AutoCompleteSingleSelect = ({
	options,
	placeholder,
	emptyMessage,
	value,
	onValueChange,
	disabled,
	isLoading = false,
	inputValue,
	setInputValue,
}: AutoCompleteSingleSelectProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isOpen, setOpen] = useState(false);
	const [selected, setSelected] = useState<any>(value);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (!input) {
				return;
			}

			// Keep the options displayed when the user is typing
			if (!isOpen) {
				setOpen(true);
			}

			// This is not a default behaviour of the <input /> field
			if (event.key === "Enter" && input.value !== "") {
				const optionToSelect = options.find((option) => option.name === input.value);
				if (optionToSelect) {
					setSelected(optionToSelect);
					onValueChange?.(optionToSelect);
				}
			}

			if (event.key === "Escape") {
				input.blur();
			}
		},
		[isOpen, options, onValueChange]
	);

	const handleBlur = useCallback(() => {
		setOpen(false);
		setInputValue(selected?.name);
	}, [selected]);

	const handleSelectOption = useCallback(
		(selectedOption: Option) => {
			setInputValue(selectedOption.name);

			setSelected(selectedOption);
			onValueChange?.(selectedOption);

			// This is a hack to prevent the input from being focused after the user selects an option
			// We can call this hack: "The next tick"
			setTimeout(() => {
				inputRef?.current?.blur();
			}, 0);
		},
		[onValueChange]
	);

	return (
		<CommandPrimitive onKeyDown={handleKeyDown}>
			<div>
				<CommandPrimitive.Input
					ref={inputRef}
					value={inputValue}
					onValueChange={isLoading ? undefined : setInputValue}
					onBlur={handleBlur}
					onFocus={() => setOpen(true)}
					placeholder={placeholder}
					disabled={disabled}
					className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				/>
			</div>
			<div className="relative mt-1">
				<div
					className={cn(
						"absolute top-0 z-10 w-full rounded-xl bg-white outline-none animate-in fade-in-0",
						isOpen ? "block" : "hidden"
					)}>
					<CommandList className="rounded-lg ring-1 ring-slate-200">
						{isLoading ? (
							<CommandPrimitive.Loading>
								<div className="p-1">
									<Skeleton className="h-8 w-full" />
								</div>
							</CommandPrimitive.Loading>
						) : null}
						{options.length > 0 && !isLoading ? (
							<CommandGroup>
								{options.map((option) => {
									const isSelected = selected?.id === option.id;
									return (
										<CommandItem
											key={option.id}
											value={option.name}
											onMouseDown={(event) => {
												event.preventDefault();
												event.stopPropagation();
											}}
											onSelect={() => handleSelectOption(option)}
											className={cn("flex w-full items-center gap-2", !isSelected ? "pl-8" : null)}>
											{isSelected ? <Check className="w-4" /> : null}
											{option.name}
										</CommandItem>
									);
								})}
							</CommandGroup>
						) : null}
						{!isLoading ? (
							<CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
								{emptyMessage}
							</CommandPrimitive.Empty>
						) : null}
					</CommandList>
				</div>
			</div>
		</CommandPrimitive>
	);
};
