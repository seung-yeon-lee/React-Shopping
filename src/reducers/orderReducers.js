import { CLEAR_ORDER, CREATE_ORDER } from "../type";

const orderReducer = (state = {}, action) => {
  console.log(action);
  const { payload, type } = action;
  switch (type) {
    case CREATE_ORDER:
      return { order: payload };

    case CLEAR_ORDER:
      return { order: null };
    default:
      return state;
  }
};

export { orderReducer };
