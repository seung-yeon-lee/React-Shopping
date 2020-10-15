const { FETCH_PRODUCTS } = require("../type");

export const productsReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case FETCH_PRODUCTS:
      return {
        items: payload,
      };
    default:
      return state;
  }
};
