import React from 'react';
import ItemsList from "./ItemsList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
    const handleClick = () => {
        setShowIndex();
    }

    return (
        <div className='w-1/2 m-auto p-3 border-b-2 bg-gray-100 rounded-lg mb-6 shadow-md' >
            <div className='flex justify-between cursor-pointer' onClick={handleClick}>
                <div className="font-bold text-lg">
                    {data?.title} ({data?.itemCards.length})
                </div>
                <div className={showItems ? "rotate-180 transition-all duration-300" : "transition-all duration-300"}>⮟</div>
            </div>
            {<div className={`${showItems ? "opacity-100" : "hidden"}`}>
                {data?.itemCards?.map((items) =>
                    <ItemsList items={items?.card?.info} />
                )
                }
            </div>}
        </div>)

}

export default RestaurantCategory;