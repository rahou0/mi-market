import { capitalizeString, formatPrice } from "@/lib/utils";
import { Product } from "@/models/product";
import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

export default function ProductDetailsCard({ product }: { product: Product }) {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="grid grid-cols-12 gap-4">
					<div className="col-start-1 col-end-11">
						<div className="grid grid-cols-4 gap-4 gap-y-2">
							<p>
								<strong>{"Name"}</strong>
							</p>
							<p>
								<strong>{"Bar Code"}</strong>
							</p>
							<p>
								<strong>{"Quantity"}</strong>
							</p>
							<p>
								<strong>{"Price"}</strong>
							</p>
							<p>{product.name}</p>
							<p>{product.barCode}</p>

							<p>
								{product.quantity} {capitalizeString(product.type)}
							</p>
							<p>{formatPrice(product.price)}</p>
							<p className="mt-4">
								<strong>{"Description"}</strong>
							</p>
							<p className="col-start-1 col-end-5 text-justify">{product.description}</p>
						</div>
					</div>

					<div className="col-start-11 col-end-13">
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
