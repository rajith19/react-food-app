import React from 'react';
import ItemsList from "./ItemsList";

const RestaurantCategory = ({ data, showItems, setShowIndex, dummy }) => {
    const handleClick = () => {
        setShowIndex();
    };

    return (
        <div className='w-full md:w-3/4 lg:w-1/2 mx-auto p-3 border-b-2 bg-gray-100 rounded-lg mb-6 shadow-md'>
            <div className='flex justify-between items-center cursor-pointer' onClick={handleClick}>
                <div className="font-bold text-lg">
                    {data?.title} ({data?.itemCards.length})
                </div>
                <div className={showItems ? "rotate-180 transition-all duration-300" : "transition-all duration-300"}>
                    ⮟
                </div>
            </div>
            {showItems && <ItemsList items={data.itemCards} dummy={dummy} />}
        </div>
    );
};

export default RestaurantCategory;
