import { Vendor } from "@/models/vendor";
import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

export default function VendorDetailsCard({ vendor }: { vendor: Vendor }) {
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
								<strong>{"Phone"}</strong>
							</p>
							<p>{vendor.name}</p>
							<p>{vendor.phone}</p>
							<p className="mt-2">
								<strong>{"Email"}</strong>
							</p>
							<p className="mt-2">
								<strong>{"City"}</strong>
							</p>
							<p>{vendor.email}</p>
							<p>{vendor.city}</p>
							<p className="mt-4">
								<strong>{"Address"}</strong>
							</p>
							<p className="col-start-1 col-end-3 text-justify">{vendor.address}</p>
						</div>
					</div>

					<div className="col-start-5 col-end-7">
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
