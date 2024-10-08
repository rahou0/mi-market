import { useState } from "react";

export const useDialog = (): [boolean, () => void, () => void] => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = (): void => {
		setOpen(true);
	};

	const handleClose = (): void => {
		setOpen(false);
	};

	return [open, handleOpen, handleClose];
};
