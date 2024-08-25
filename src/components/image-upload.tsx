"use client";

import { getFileBase64 } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

import { Input } from "./ui/input";

interface ImageUploadInterface {
	oldImageUrl?: string;
}

type ImageUploadProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> &
	ImageUploadInterface;

export function ImageUpload({ oldImageUrl, onChange, ...props }: ImageUploadProps) {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	return (
		<>
			<Input
				type="file"
				{...props}
				onChange={(e) => {
					if (e.target.files?.[0]) {
						getFileBase64(e.target.files?.[0], (url) => {
							setImageUrl(url);
						});
					} else setImageUrl(null);
					if (onChange instanceof Function) onChange(e);
				}}
			/>
			{(oldImageUrl || imageUrl) && (
				<div className="group flex justify-center overflow-hidden rounded-lg border border-input">
					<Image
						src={imageUrl ?? oldImageUrl ?? ""}
						width={100}
						height={100}
						alt="file image"
					/>
				</div>
			)}
		</>
	);
}
