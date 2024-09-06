import React from "react";

type TablePageHeaderProps = {
	heading?: string;
	count?: number;
	children?: React.ReactNode;
};
function TablePageHeader({ heading, count, children }: Readonly<TablePageHeaderProps>) {
	return (
		<div className="mx-auto flex w-full items-center justify-between gap-2">
			{heading && (
				<h1 className="align-middle text-3xl font-semibold leading-none tracking-tight">
					{heading} {count !== undefined && `(${count})`}
				</h1>
			)}

			{children}
		</div>
	);
}

export default TablePageHeader;
