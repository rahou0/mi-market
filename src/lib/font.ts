import localFont from "next/font/local";

const gellix = localFont({
	src: [
		{
			path: "../../public/fonts/gellix/Gellix-Thin.woff2",
			weight: "100",
			style: "normal",
		},
		{
			path: "../../public/fonts/gellix/Gellix-ThinItalic.woff2",
			weight: "100",
			style: "italic",
		},
		{
			path: "../../public/fonts/gellix/Gellix-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/gellix/Gellix-LightItalic.woff2",
			weight: "300",
			style: "italic",
		},
		{
			path: "../../public/fonts/gellix/Gellix-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/gellix/Gellix-RegularItalic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "../../public/fonts/gellix/Gellix-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/gellix/Gellix-MediumItalic.woff2",
			weight: "500",
			style: "italic",
		},
		{
			path: "../../public/fonts/gellix/Gellix-SemiBold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../public/fonts/gellix/Gellix-SemiBoldItalic.woff2",
			weight: "600",
			style: "italic",
		},
		{
			path: "../../public/fonts/gellix/Gellix-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "../../public/fonts/gellix/Gellix-BoldItalic.woff2",
			weight: "700",
			style: "italic",
		},
		{
			path: "../../public/fonts/gellix/Gellix-ExtraBold.woff2",
			weight: "800",
			style: "normal",
		},
		{
			path: "../../public/fonts/gellix/Gellix-ExtraBoldItalic.woff2",
			weight: "800",
			style: "italic",
		},
		{
			path: "../../public/fonts/gellix/Gellix-Black.woff2",
			weight: "900",
			style: "normal",
		},
		{
			path: "../../public/fonts/gellix/Gellix-BlackItalic.woff2",
			weight: "900",
			style: "italic",
		},
	],
});

export const getFontsClassnames = () => [gellix.className].join(" ");
