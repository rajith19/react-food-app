const ShimmerUi = () => {
    const emptyArray = new Array(8).fill(null); // Create an array with 8 empty values

    return (
        <div className="mx-4 sm:mx-10 lg:mx-20 my-4 px-4 sm:px-8 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {emptyArray.map((_, index) => (
                    <div key={index} role="status" className="space-y-8 animate-pulse">
                        <div className="flex items-center justify-center w-full h-64 bg-gray-300 rounded dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShimmerUi;
