import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShimmerUiDetails from './ShimmerUiDetails';

const RestaurantMenu = () => {

    useEffect(() => {
        fetchMenu();
    }, []);

    const [restaurantInfo, setRestaurantInfo] = useState("");
    const [restaurantMenuList, setRestaurantMenuList] = useState([]);
    const { resId } = useParams();
    const fetchMenu = async () => {
        const fetchdata = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
        const json = await fetchdata.json();
        setRestaurantInfo(json?.data?.cards[0]?.card?.card?.info)
        setRestaurantMenuList(json?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards)
    }

    const { name, cuisines, costForTwoMessage } = restaurantInfo;

    return restaurantInfo?.length == 0 ? <ShimmerUiDetails /> :
        (
            <div className='menu'>
                <h1>{name}</h1>
                <h2>{cuisines?.join(", ")}</h2>
                <h2>{costForTwoMessage}</h2>
                <h2>Menu</h2>
                <ul>{
                    restaurantMenuList?.map((list) => {
                        return (
                            <li key={list?.card?.info?.id}>{list?.card?.info?.name}</li>
                        )
                    })
                }
                </ul>
            </div>
        )
}


export default RestaurantMenu;