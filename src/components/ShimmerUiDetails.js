const ShimmerUiDetails = () => {
	const emptyArray = new Array(10).fill(null);

	return (
		<>
			<div className="animate-pulse flex flex-col items-center text-center max-w-3xl mt-10 m-auto p-3">
				<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-2.5"></div>
				<div className="w-60 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
			</div>
			<div role="status" className="max-w-3xl p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 	 mt-10 m-auto p-3">
				{emptyArray.map((_, index) => {
					return <div className="flex items-center justify-between pt-4">
						<div>
							<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
							<div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
						</div>
						<div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
					</div>
				})}
			</div>
			
		</>
	);
};

export default ShimmerUiDetails;