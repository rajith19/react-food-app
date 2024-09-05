import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantInfo from '../utils/useRestaurantInfo';
import RestaurantCategory from './RestaurantCategory';
import ShimmerUiDetails from './ShimmerUiDetails';

const RestaurantMenu = () => {

    const { resId } = useParams();

    const dummy = "Dummy Data";
    const restaurantInfo = useRestaurantInfo(resId);
    const [showIndex, setShowIndex] = useState(0);
    if (restaurantInfo === null) return <ShimmerUiDetails />;

    const { name, cuisines, costForTwoMessage } = restaurantInfo?.cards[2]?.card?.card?.info;
    const itemCategories = restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(category => category?.card?.card["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    return restaurantInfo.cards[2]?.card?.card?.info?.length == 1 ? <ShimmerUiDetails /> :
        (
            <div className='text-center my-10'>
                <h1 className='text-2xl font-bold'>{name}</h1>
                <h4 className='font-normal'>{cuisines?.join(", ")} -  {costForTwoMessage}</h4>
                <div className='mt-10'>
                    {itemCategories?.map((category, index) =>
                        <RestaurantCategory
                            key={index}
                            data={category?.card?.card}
                            showItems={index == showIndex}
                            setShowIndex={() => setShowIndex(index === showIndex ? -1 : index)} // Toggle logic
                            dummy={dummy}
                        />
                    )}
                </div>
            </div>
        )
}


export default RestaurantMenu;