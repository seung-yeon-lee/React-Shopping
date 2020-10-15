import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
// const composeExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ product: productsReducer }),
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
