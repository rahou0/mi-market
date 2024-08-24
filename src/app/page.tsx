import { ContentLayout } from "@/components/layouts/content-layout";

export default function DashboardPage() {
	return (
		<ContentLayout
			title="Dashboard"
			breadCrumbItems={[{ label: "Dashboard" }]}>
			<div />
		</ContentLayout>
	);
}
