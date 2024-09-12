import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../utils/cartSlice.js';
import ItemsList from './ItemsList.js';
import { Link } from 'react-router-dom';
import emptyCart from '../images/emptyCart.png'

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className='text-center m-4 p-4 flex flex-col items-center'>
            {cartItems.length !== 0 ? (
                <>
                    <h1 className='font-bold text-xl'>Cart</h1>
                    <button className='py-1 px-4 m-2 bg-[#ff4d4d] text-white  hover:bg-[#ff3333] rounded-lg mb-5' onClick={handleClearCart}>
                        Clear
                    </button>
                    <div className='m-auto w-1/2 p-3 border-b-2 bg-gray-100 rounded-lg mb-6 shadow-md'>
                        <ItemsList items={cartItems} />
                    </div>
                </>
            ) : (
                <>
                    <img src={emptyCart} alt="empty cart" width="100" />
                    <div className='text-2xl font-bold p-6'>
                        Your cart is <span className='text-red-500'>Empty!</span>
                    </div>
                    <Link to="/"><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-3xl cursor-pointer'>Return to shop</button></Link>
                </>
            )}
        </div>
    );
};

export default Cart;
