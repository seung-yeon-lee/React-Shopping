const { FETCH_PRODUCTS, FILTER_PRICE, FILTER_SIZE } = require("../type");

export const productsReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case FETCH_PRODUCTS:
      return {
        items: payload,
        filteredItems: payload,
      };
    case FILTER_SIZE:
      return {
        ...state,
        size: payload.size,
        filteredItems: payload.items,
      };
    case FILTER_PRICE:
      return {
        ...state,
        sort: payload.sort,
        filteredItems: payload.items,
      };

    default:
      return state;
  }
};
