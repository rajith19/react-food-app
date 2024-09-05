import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice.js"; // Import both addItem and removeItem
import { CDN_URL } from "../utils/constants";
import placeholderImage from '../images/placeholder.png'; 

const ItemsList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleAddItem = (item) => {
    console.log(item);
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const getItemQuantity = (itemId) => {
    const items = cartItems.filter(cartItem => cartItem.card.info.id === itemId);
    if (items.length > 0) {
      return items.reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 pb-6 m-2 border-gray-200 border-b-2 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{item.card.info.name}</span>
              <span>
                - ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs">{item.card.info.description}</p>
          </div>
          <div className="w-3/12 mx-auto p-4 relative">
            <div className="absolute -bottom-2">
              {getItemQuantity(item.card.info.id) > 0 ? (
                <div className="flex items-center space-x-2 mx-6">
                  <button
                    className="px-3 py-1 rounded bg-white font-bold shadow-lg transition ease-in-out duration-100 translate-y-0 hover:bg-slate-200 hover:z-10"
                    onClick={() => handleRemoveItem(item)}
                  >
                    -
                  </button>
                  <span className="text-lg text-[rgb(27,166,114)] font-bold">{getItemQuantity(item.card.info.id)}</span>
                  <button
                    className="px-3 py-1 rounded bg-white font-bold shadow-lg transition ease-in-out duration-100 translate-y-0 hover:bg-slate-200 hover:z-10"
                    onClick={() => handleAddItem(item)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="py-2 px-6 mx-8 rounded-lg bg-white text-[rgb(27,166,114)] font-bold shadow-lg transition ease-in-out duration-100 translate-y-0 hover:bg-slate-200 hover:z-10"
                  onClick={() => handleAddItem(item)}
                >
                  ADD
                </button>
              )}
            </div>
            <img
              src={item.card.info.imageId ? CDN_URL + item.card.info.imageId : placeholderImage } 
              className="w-full rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
