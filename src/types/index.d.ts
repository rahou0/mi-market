export type BreadCrumbItem = { label: string; href?: string };

export type Option = Record<"value" | "label", string> & Record<string, string>;
