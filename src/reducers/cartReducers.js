import { ADD_CART, CLEAR_CART, DELETE_CART } from "../type";

export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
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
    case CLEAR_CART:
      return {
        cartItems: [],
      };
    default:
      return state;
  }
};
