import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground",
				warning:
					"border-transparent bg-orange-400 text-destructive-foreground hover:bg-orange-400/80",
				info: "border-transparent bg-[#1070CA] text-primary-foreground hover:bg-[#1070CA]/80",
				success: "border-transparent bg-[#27AB6E] text-primary-foreground hover:bg-[#27AB6E]/80",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export type BadgeVariantProps =
	| "default"
	| "warning"
	| "destructive"
	| "outline"
	| "secondary"
	| "info"
	| "success"
	| null
	| undefined;

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
