const ShimmerUiDetails = () => {
	const emptyArray = new Array(10).fill(null);

	return (
		<>
			{/* Title Shimmer */}
			<div className="animate-pulse flex flex-col items-center text-center max-w-3xl mt-10 mx-4 sm:mx-auto p-3">
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-2.5"></div>
				<div className="w-60 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
			</div>

			{/* Details Shimmer */}
			<div
				role="status"
				className="max-w-3xl mx-4 sm:mx-auto p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 mt-10"
			>
				{emptyArray.map((_, index) => (
					<div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4">
						<div className="flex-1 space-y-2">
							<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
							<div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
						</div>
						<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12 mt-2 sm:mt-0"></div>
					</div>
				))}
			</div>
		</>
	);
};

export default ShimmerUiDetails;
