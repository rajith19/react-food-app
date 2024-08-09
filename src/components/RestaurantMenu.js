import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantInfo from '../utils/useRestaurantInfo';
import RestaurantCategory from './RestaurantCategory';
import ShimmerUiDetails from './ShimmerUiDetails';

const RestaurantMenu = () => {

    const { resId } = useParams();
    const restaurantInfo = useRestaurantInfo(resId);
    const [showIndex, setShowIndex] = useState(0);
    if (restaurantInfo === null) return <ShimmerUiDetails />;


    console.log(restaurantInfo?.cards);
    const { name, cuisines, costForTwoMessage } = restaurantInfo?.cards[2]?.card?.card?.info;
    const itemCategories = restaurantInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(category => category?.card?.card["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    console.log( itemCategories, restaurantInfo?.cards);

    return restaurantInfo.cards[0]?.card?.card?.info?.length == 0 ? <ShimmerUiDetails /> :
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
                        />
                    )}
                </div>
            </div>
        )
}


export default RestaurantMenu;