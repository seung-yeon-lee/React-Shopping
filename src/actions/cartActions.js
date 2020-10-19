import { DELETE_CART, ADD_CART, CLEAR_CART } from "../type";

export const addCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let ready = false;
  cartItems.forEach((x) => {
    if (x._id === product._id) {
      x.count++;
      ready = true;
    }
  });
  if (!ready) {
    cartItems.push({ ...product, count: 1 });
  }
  dispatch({
    type: ADD_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const deleteCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x._id !== product._id);
  dispatch({
    type: DELETE_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
