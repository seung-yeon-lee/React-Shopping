import { FETCH_PRODUCTS, FILTER_PRICE, FILTER_SIZE } from "../type";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.size.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (products, sort) => (dispatch) => {
  const sortedProducts = products.slice();
  if (sort === "init") {
    sortedProducts.sort((a, b) => (a.title > b.title ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  dispatch({
    type: FILTER_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
