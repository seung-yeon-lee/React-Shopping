import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
// const composeExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ product: productsReducer, cart: cartReducer }),
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
