import { ProductsSearchFilter } from "@/components/filters/products/products-search-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Filters() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{"Filters"}</CardTitle>
			</CardHeader>
			<CardContent className="flex items-center justify-between gap-2">
				<div>
					<ProductsSearchFilter />
				</div>
			</CardContent>
		</Card>
	);
}
