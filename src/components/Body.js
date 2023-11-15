import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import ShimmerUi from "./ShimmerUi";

const Body = () => {

    const [ListOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setfilteredRestaurants] = useState([]);
    const [searchRestaurantText, setsearchRestaurantText] = useState("");


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

    return ListOfRestaurants?.length === 0 ? <ShimmerUi /> :
        (
            <div className="body">
                <div className="search-container">
                    <div className="search-bar">
                        <input type="text" className="searchText" value={searchRestaurantText}
                            onChange={(e) => setsearchRestaurantText(e.target.value)}></input>
                        <button onClick={() => {
                            const filteredRes = ListOfRestaurants.filter((res) =>
                                (res?.info?.name.toLowerCase().includes(searchRestaurantText.toLowerCase()))
                            )
                            setfilteredRestaurants(filteredRes);
                        }}>Search</button>
                    </div>
                    <div className="filter">
                        <button className="filter-btn" onClick={() => {
                            const filteredList = ListOfRestaurants.filter(res => res.info.avgRating > 4.3);
                            setfilteredRestaurants(filteredList);
                        }}> Top Rated Restaurant</button>
                    </div>
                </div>
                <div className="res-container">
                    {
                        filteredRestaurants?.map((restaurant) => (
                            <Link key={restaurant.info.id} to={`/restaurant/${restaurant.info.id}`} className="filteredLink">
                                <RestaurantCard resData={restaurant} key={restaurant.info.id} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
}


export default Body;