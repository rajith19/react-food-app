import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../utils/useDebounce";
import RestaurantCard, { PromotedRestaurantCard } from "./RestaurantCard";
import ShimmerUi from "./ShimmerUi";

const Body = () => {

    const [ListOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setfilteredRestaurants] = useState([]);
    const [searchRestaurantText, setsearchRestaurantText] = useState("");
    const debouncedSearchTerm = useDebounce(searchRestaurantText, 500); // 500ms delay
    const WithRestaurantCard = PromotedRestaurantCard(RestaurantCard);

    useEffect(() => {
        if (debouncedSearchTerm) {
            filteredData();
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();

        const cards = json?.data?.cards;

        // Check if the property exists in one of the elements within the range of 0 to 6
        const foundRestaurantList = cards?.slice(0, 7).find(card => {
            return (card?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        });
        if (foundRestaurantList) {
            // If found, set the ListOfRestaurants to the value of the property
            setListOfRestaurants(foundRestaurantList?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setfilteredRestaurants(foundRestaurantList?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        } else {
            // If not found, set ListOfRestaurants to an empty array or handle it as needed
            setListOfRestaurants([]);
            setfilteredRestaurants([]);
        }

    }

    const filteredData = () => {
        const filteredRes = ListOfRestaurants.filter((res) =>
            (res?.info?.name.toLowerCase().includes(searchRestaurantText.toLowerCase()))
        )
        setfilteredRestaurants(filteredRes);
    }

    return ListOfRestaurants?.length === 0 ? <ShimmerUi /> :
        (
            <div className="mx-20 my-4 px-16">
                <div className="flex m-4 items-center">
                    <div className="pr-4 py-4">
                        <input type="text" className="border border-black mr-4 cursor-auto" value={searchRestaurantText}
                            onChange={(e) => setsearchRestaurantText(e.target.value)}></input>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded cursor-pointer" onClick={() => {
                            filteredData()
                        }}>Search</button>
                    </div>
                    <div className="p-4">
                        <button className="flex items-center bg-white hover:bg-gray-100 text-gray-800 border font-semibold py-[0.3rem] px-4 rounded cursor-pointer" onClick={() => {
                            const filteredList = ListOfRestaurants.filter(res => res.info.avgRating > 4.3);

                            setfilteredRestaurants(filteredList);
                        }}> Top Rated Restaurant (Above 4.5 <svg className="w-4 h-4 text-yellow-300 inline-block" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>) </button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-6 grid-flow-row justify-items-center">
                    {
                        filteredRestaurants?.map((restaurant) => (
                            <Link key={restaurant.info.id} to={`/restaurant/${restaurant.info.id}`} className="filteredLink">
                                {restaurant?.info?.aggregatedDiscountInfoV3?.discountTag === "FLAT DEAL" ?
                                    <WithRestaurantCard resData={restaurant} key={restaurant.info.id} />
                                    : <RestaurantCard resData={restaurant} key={restaurant.info.id} />}
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
}


export default Body;