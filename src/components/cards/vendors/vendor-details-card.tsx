import { Vendor } from "@/models/vendor";
import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

export default function VendorDetailsCard({ vendor }: { vendor: Vendor }) {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="grid grid-cols-12 gap-4">
					<div className="col-start-1 col-end-12">
						<div className="grid grid-cols-5 gap-4 gap-y-2">
							<p>
								<strong>{"Name"}</strong>
							</p>
							<p>
								<strong>{"Phone"}</strong>
							</p>
							<p>
								<strong>{"Email"}</strong>
							</p>
							<p>
								<strong>{"Address"}</strong>
							</p>
							<p>
								<strong>{"City"}</strong>
							</p>
							<p>{vendor.name}</p>
							<p>{vendor.phone}</p>

							<p>{vendor.email}</p>
							<p>{vendor.address}</p>
							<p>{vendor.city}</p>
						</div>
					</div>

					<div className="col-start-12 col-end-13">
						<Image
							src={vendor.imageUrl}
							width={0}
							height={0}
							sizes="100vw"
							style={{ width: "100%", height: "auto" }} // optional
							alt={vendor.name}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
