import { useEffect, useState } from "react";

const useRestaurantInfo = (resId) => {

    useEffect(() => {
        fetchMenu();
    }, []);

    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const fetchMenu = async () => {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9351929&lng=77.&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);
        const json = await data.json();
        setRestaurantInfo(json?.data)
    }
    return restaurantInfo;
}

export default useRestaurantInfo;