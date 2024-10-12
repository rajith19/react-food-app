import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice.js"; // Import both addItem and removeItem
import { CDN_URL } from "../utils/constants";
import placeholderImage from '../images/placeholder.png';

const ItemsList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleAddItem = (item) => {
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
    <div className="p-4">
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 pb-6 mb-4 border-gray-200 border-b-2 text-left flex flex-col sm:flex-row justify-between"
        >
          {/* Item Details */}
          <div className="w-full sm:w-9/12 mb-4 sm:mb-0">
            <div className="py-2">
              <span className="block text-lg font-semibold">{item.card.info.name}</span>
              <span className="block text-gray-500">
                ₹{item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs text-gray-600">{item.card.info.description}</p>
          </div>

          {/* Image and Add/Remove Buttons */}
          <div className="w-full sm:w-3/12 mx-auto p-4 relative">
            <div className="absolute -bottom-3 w-full flex justify-center">
              {getItemQuantity(item.card.info.id) > 0 ? (
                <div className="flex items-center justify-between w-full sm:w-auto shadow-xl bg-gray-100 rounded-lg px-2 py-1">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 font-bold transition ease-in-out duration-100 hover:bg-slate-200"
                    onClick={() => handleRemoveItem(item)}
                  >
                    -
                  </button>
                  <span className="text-lg w-8 text-center text-[rgb(27,166,114)] font-extrabold">
                    {getItemQuantity(item.card.info.id)}
                  </span>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 font-bold transition ease-in-out duration-100 hover:bg-slate-200"
                    onClick={() => handleAddItem(item)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="py-2 px-6 rounded-lg bg-white text-[rgb(27,166,114)] font-bold shadow-lg transition ease-in-out duration-100 hover:bg-slate-200"
                  onClick={() => handleAddItem(item)}
                >
                  ADD
                </button>
              )}
            </div>
            <img
              src={item.card.info.imageId ? CDN_URL + item.card.info.imageId : placeholderImage}
              className="w-full h-40 object-cover rounded-lg"
              alt={item.card.info.name}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
