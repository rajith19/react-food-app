import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.card.info.id === action.payload.card.info.id);

            if (existingItem) {
                // If the item already exists, increase its quantity
                existingItem.quantity += 1;
            } else {
                // If it's a new item, add it to the cart with a quantity of 1
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const existingItem = state.items.find(item => item.card.info.id === action.payload.card.info.id);

            if (existingItem && existingItem.quantity > 1) {
                // If the item exists and quantity is greater than 1, decrease its quantity
                existingItem.quantity -= 1;
            } else {
                // Otherwise, remove the item from the cart
                state.items = state.items.filter(item => item.card.info.id !== action.payload.card.info.id);
            }
        },
        clearCart: (state) => {
            // Clear the entire cart
            state.items = [];
        }
    }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;