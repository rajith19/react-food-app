import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
    // console.log(resData)

    const { name, cuisines, costForTwo, avgRating, sla, cloudinaryImageId } = resData?.info;
    const { slaString } = sla;

    return (
        <div data-testid="resCard" className="w-[250px] cursor-pointer transition-all hover:scale-95 hover:origin-center hover:transition-all hover:ease-in-out">
            <div className="grid gap-3 justify-stretch">
                <div className="relative border rounded-2xl overflow-hidden drop-shadow-lg w-56 h-40">
                    <img className="w-full h-full object-cover" alt="res-logo" src={CDN_URL + cloudinaryImageId} />
                </div>
                <div>
                    <h2 className="text-base overflow-hidden break-words text-zinc-700 font-semibold line-clamp-1">{name}</h2>
                    <div className="flex items-center">
                        <h4 className="font-semibold">{avgRating}</h4>
                        <h4 className="px-2 font-semibold"> • </h4>
                        <h4 className="font-semibold">{slaString}</h4>
                    </div>
                    <h4 className="line-clamp-1">{cuisines.join(", ")}</h4>
                    <h4 className="costForTwo">{costForTwo}</h4>

                </div>
            </div>
        </div>
    );
};

export const PromotedRestaurantCard = (RestaurantCard) => {
    return (props) => {
        return <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 h-16 w-16 z-10 ">

                <div className="absolute left-[-55px] top-[15px] w-[170px] transform -rotate-45 bg-green-700 text-center text-white font-semibold py-1">Popular</div>

            </div>
            <RestaurantCard {...props} />
        </div>

    }
}

export default RestaurantCard;