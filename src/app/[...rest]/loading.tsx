import React from "react";

import { ContentLayout } from "@/components/layouts/content-layout";
import LoadingCircle from "@/components/loading-circle";

function Loading() {
	return (
		<ContentLayout title={""}>
			<LoadingCircle />
		</ContentLayout>
	);
}

export default Loading;
