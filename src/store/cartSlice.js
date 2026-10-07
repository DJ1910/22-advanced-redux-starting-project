import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { cartItems: [], hasChanged: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.cartItems = action.payload.cartItems ?? [] ;
    },
    
    addItemToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex === -1) {
        state.cartItems.push(action.payload);
      } else {
        state.cartItems[itemIndex].quantity++;
      }
      state.hasChanged = true;
    },

    updateCartItemQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      state.cartItems[itemIndex].quantity += action.payload.amount;

      if (state.cartItems[itemIndex].quantity <= 0) {
        state.cartItems.splice(itemIndex, 1);
      }
      state.hasChanged = true;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
