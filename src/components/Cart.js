import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../utils/cartSlice.js';
import ItemsList from './ItemsList.js';

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className='text-center m-4 p-4'>
            <h1 className='font-bold text-xl'>Cart</h1>
            <button className='py-1 px-4 m-2 bg-white text-black border-2  hover:bg-slate-200 rounded-lg mb-5' onClick={handleClearCart}>
                Clear
            </button>
            {cartItems.length !== 0 ? (
                <div className='m-auto w-1/2 p-3 border-b-2 bg-gray-100 rounded-lg mb-6 shadow-md'>
                    <ItemsList items={cartItems} />
                </div>
            ) : (
                <div className='text-xl font-bold p-6'>
                    Cart empty. Add items to the cart.
                </div>
            )}
        </div>
    );
};

export default Cart;
