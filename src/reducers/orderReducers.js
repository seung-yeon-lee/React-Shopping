import { CLEAR_ORDER, CREATE_ORDER, FETCH_ORDERS } from "../type";

const orderReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case CREATE_ORDER:
      return { order: payload };

    case CLEAR_ORDER:
      return { order: null };
    case FETCH_ORDERS:
      return { orders: payload };
    default:
      return state;
  }
};

export { orderReducer };
