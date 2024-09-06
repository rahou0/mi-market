"use client";

import { File, FileImage, FolderArchive, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Input } from "./ui/input";

enum FileTypes {
	Image = "image",
	Csv = "csv",
	Other = "other",
}

const ImageColor = {
	bgColor: "bg-purple-600",
	fillColor: "fill-purple-600",
};

const CsvColor = {
	bgColor: "bg-green-400",
	fillColor: "fill-green-400",
};

const OtherColor = {
	bgColor: "bg-gray-400",
	fillColor: "fill-gray-400",
};

interface FileUploadInterface {
	onRemove?: () => void;
	value?: File;
	oldFile?: string;
}

type FileUploadProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> &
	FileUploadInterface;

export function FileUpload({ value, oldFile, onRemove, ...props }: FileUploadProps) {
	const fileInput = useRef<HTMLInputElement | null>(null); // ADDED

	const handleClick = () => {
		if (fileInput?.current) {
			fileInput.current.click();
		}
	};
	const getFileIconAndColor = (file: File) => {
		if (file.type.includes(FileTypes.Image)) {
			return {
				icon: (
					<FileImage
						size={22}
						className={ImageColor.fillColor}
					/>
				),
				color: ImageColor.bgColor,
			};
		}

		if (file.type.includes(FileTypes.Csv)) {
			return {
				icon: (
					<File
						size={22}
						className={CsvColor.fillColor}
					/>
				),
				color: CsvColor.bgColor,
			};
		}

		return {
			icon: (
				<FolderArchive
					size={22}
					className={OtherColor.fillColor}
				/>
			),
			color: OtherColor.bgColor,
		};
	};

	return (
		<>
			{oldFile && !value && (
				<div className="group flex justify-between gap-2 overflow-hidden rounded-lg border border-input pr-2 transition-all hover:pr-0 hover:outline-none">
					<div className="flex flex-1 items-center p-2">
						<div className="text-white">
							<Image
								src={oldFile}
								width={40}
								height={40}
								alt="file image"
							/>
						</div>
						<input
							className="ml-2 w-full cursor-pointer space-y-1"
							onClick={handleClick}
							type="button">
							<div className="flex justify-between text-sm">
								<p className="">{""}</p>
							</div>
						</input>
					</div>
					<button
						onClick={onRemove}
						className="hidden items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex">
						<X size={20} />
					</button>
				</div>
			)}
			{value && (
				<div className="group flex justify-between gap-2 overflow-hidden rounded-lg border border-input pr-2 transition-all hover:pr-0 hover:outline-none">
					<div className="flex flex-1 items-center p-2">
						<div className="text-white">{getFileIconAndColor(value).icon}</div>
						<input
							className="ml-2 w-full cursor-pointer space-y-1"
							onClick={handleClick}
							type="button">
							<div className="flex justify-between text-sm">
								<p className="">{value.name}</p>
							</div>
						</input>
					</div>
					<button
						onClick={onRemove}
						className="hidden items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex">
						<X size={20} />
					</button>
				</div>
			)}

			<Input
				type="file"
				ref={fileInput}
				style={value ? { display: "none" } : {}}
				{...props}
			/>
		</>
	);
}
