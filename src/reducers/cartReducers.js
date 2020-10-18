import { ADD_CART, DELETE_CART } from "../type";

const initial = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || " {}"),
};

export const cartReducer = (state = initial, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CART:
      return {
        cartItems: payload.cartItems,
      };
    case DELETE_CART:
      return {
        cartItems: payload.cartItems,
      };
    default:
      return state;
  }
};
