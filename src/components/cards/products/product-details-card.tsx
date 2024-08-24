import { capitalizeString, formatPrice } from "@/lib/utils";
import { Product } from "@/models/product";
import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

export default function ProductDetailsCard({ product }: { product: Product }) {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="grid grid-cols-6 gap-4">
					<div className="col-start-1 col-end-5">
						<div className="grid grid-cols-2 gap-4 gap-y-2">
							<p className="">
								<strong>{"Name"}</strong>
							</p>
							<p>
								<strong>{"Bar Code"}</strong>
							</p>
							<p>{product.name}</p>
							<p>{product.barCode}</p>
							<p className="mt-2">
								<strong>{"Quantity"}</strong>
							</p>
							<p className="mt-2">
								<strong>{"Price"}</strong>
							</p>
							<p>
								{product.quantity} {capitalizeString(product.type)}
							</p>
							<p>{formatPrice(product.price)}</p>
							<p className="mt-4">
								<strong>{"Description"}</strong>
							</p>
							<p className="col-start-1 col-end-3 text-justify">{product.description}</p>
						</div>
					</div>

					<div className="col-start-5 col-end-7">
						<Image
							src={product.imageUrl}
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: "100%", height: "auto" }} // optional
							alt={product.name}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
