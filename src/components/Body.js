import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../utils/useDebounce";
import RestaurantCard, { PromotedRestaurantCard } from "./RestaurantCard";
import ShimmerUi from "./ShimmerUi";
import UserContext from "../utils/UserContext.js";

const Body = () => {
    const [ListOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchRestaurantText, setSearchRestaurantText] = useState("");
    const [tempName, setTempName] = useState(""); // Temporary state for profile name input
    const [isFiltered, setIsFiltered] = useState(false); // Temporary state for profile name input
    const WithRestaurantCard = PromotedRestaurantCard(RestaurantCard);

    const { setName } = useContext(UserContext);
    let debouncedUserName = useDebounce(tempName, 500); // 500ms delay for debouncing the context value

    useEffect(() => {
        if (debouncedUserName) {
            // Perform any action here when the debounced username is updated
            setName(debouncedUserName);
        }
    }, [debouncedUserName]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        const cards = json?.data?.cards;

        // Check if the property exists in one of the elements within the range of 0 to 6
        const foundRestaurantList = cards?.slice(0, 7).find(card => {
            return card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        });
        if (foundRestaurantList) {
            setListOfRestaurants(foundRestaurantList?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setFilteredRestaurants(foundRestaurantList?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        } else {
            setListOfRestaurants([]);
            setFilteredRestaurants([]);
        }
    };

    const filteredData = () => {
        const filteredRes = ListOfRestaurants.filter((res) =>
            res?.info?.name.toLowerCase().includes(searchRestaurantText.toLowerCase())
        );
        setFilteredRestaurants(filteredRes);
        setIsFiltered(false);
    };

    return ListOfRestaurants?.length === 0 ? (
        <ShimmerUi />
    ) : (
        <div className="mx-4 sm:mx-10 lg:mx-20 my-4 px-4 sm:px-8 lg:px-16">
            <div className="flex flex-col lg:flex-row m-4 items-center gap-4">
                {/* Search Input and Button */}
                <div className="lg:pr-4 py-4 w-full lg:w-auto flex flex-col lg:flex-row items-center gap-2">
                    <input
                        type="text"
                        data-testid="search"
                        className="rounded border border-black cursor-auto py-1 px-2 w-full lg:w-auto"
                        value={searchRestaurantText}
                        onChange={(e) => setSearchRestaurantText(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg cursor-pointer w-full lg:w-auto"
                        onClick={filteredData}
                    >
                        Search
                    </button>
                </div>

                {/* Top Rated Button */}
                <div className="w-full lg:w-auto flex justify-center">
                    <button
                        className="flex items-center bg-blue-500 hover:bg-blue-700 text-white border font-semibold py-2 px-4 rounded-lg cursor-pointer w-full lg:w-auto"
                        onClick={() => {
                            const filteredList = ListOfRestaurants.filter((res) => res.info.avgRating > 4.5);
                            setFilteredRestaurants(filteredList);
                            setIsFiltered(true);
                        }}
                    >
                        Top Rated Restaurant (Above 4.5{" "}
                        <svg
                            className="w-4 h-4 text-yellow-300 inline-block"
                            ariaHidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        )
                    </button>
                </div>

                {/* Profile Name Input */}
                <div className="w-full lg:w-auto">
                    <input
                        type="text"
                        placeholder="Change the profile name"
                        className="rounded border border-black cursor-auto px-2 py-1 w-full lg:w-auto"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                    />
                </div>
            </div>

            {isFiltered && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-blue-900 dark:text-white flex items-center w-fit mt-2">
                    Above 4.5{" "}
                    <svg
                        className="ml-1 w-4 h-4 text-yellow-300 inline-block"
                        ariaHidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <button className="ml-2" onClick={() => filteredData()}>
                        <svg
                            className="h-5 w-5 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </span>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 grid-flow-row justify-items-center mt-10">
                {filteredRestaurants.length !== 0 ? (
                    filteredRestaurants?.map((restaurant) => (
                        <Link
                            key={restaurant.info.id}
                            to={`/restaurant/${restaurant.info.id}`}
                            className="filteredLink w-full sm:w-auto"
                        >
                            {restaurant?.info?.aggregatedDiscountInfoV3?.discountTag === "FLAT DEAL" ? (
                                <WithRestaurantCard resData={restaurant} key={restaurant.info.id} />
                            ) : (
                                <RestaurantCard resData={restaurant} key={restaurant.info.id} />
                            )}
                        </Link>
                    ))
                ) : (
                    "No results match your search. Try another term!"
                )}
            </div>
        </div>
    );
};

export default Body;
