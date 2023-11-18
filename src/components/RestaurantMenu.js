import React from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantInfo from '../utils/useRestaurantInfo';
import ShimmerUiDetails from './ShimmerUiDetails';

const RestaurantMenu = () => {

    const { resId } = useParams();
    const restaurantInfo = useRestaurantInfo(resId);

    if (restaurantInfo === null) return <ShimmerUiDetails />;

    const { name, cuisines, costForTwoMessage } = restaurantInfo?.cards[0]?.card?.card?.info;
    const restaurantMenuList = restaurantInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards;

    return restaurantInfo.cards[0]?.card?.card?.info?.length == 0 ? <ShimmerUiDetails /> :
        (
            <div className='menu'>
                <h1>{name}</h1>
                <h4>{cuisines?.join(", ")} -  {costForTwoMessage}</h4>
                <h2>Menu</h2>
                <ul>{
                    restaurantMenuList?.map((list) => {
                        return (
                            <div>
                                <li key={list?.card?.info?.id}>{list?.card?.info?.name} - Rs.{list?.card?.info?.price / 100 || list?.card?.info?.defaultPrice / 100}  </li>
                            </div>
                        )
                    })
                }
                </ul>
            </div>
        )
}


export default RestaurantMenu;