import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
    const { name, cuisines, costForTwo, avgRating, sla, cloudinaryImageId } = resData?.info;
    const { deliveryTime } = sla;

    return (
        <div className="res-card">
            <div className="res-image-container">
                <img className="res-logo" alt="res-logo" src={CDN_URL + cloudinaryImageId} />
            </div>
            <h3 className="name">{name}</h3>
            <h4 className="cuisines">{cuisines.join(", ")}</h4>
            <h4 className="costForTwo">{costForTwo}</h4>
            <h4 className="avgRating">{avgRating}</h4>
            <h4 className="deliveryTime">{deliveryTime}</h4>
        </div>
    );
};

export default RestaurantCard;