import React, { Component } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems;
    let already = true;
    cartItems.map((item) => {
      if (item._id === product._id) {
        item.count++;
        already = false;
      }
    });
    if (already) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeItem = (item) => {
    const { cartItems } = this.state;
    const remove = cartItems.filter((v) => v._id !== item._id);
    this.setState({ cartItems: remove });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((v) => v._id !== item._id))
    );
  };

  createOrder = (order) => {
    const q = order.cartItems.map((v) => v.price);
    const result = window.confirm(
      `${order.name}님이 선택하신 상품의 총 금액은 ${q} 입니다 계속 진행하시겠습니까?`
    );
    if (result) {
      window.confirm("정상 처리 되었습니다");
    }
    this.setState({ cartItems: [] });
  };

  render() {
    const { cartItems } = this.state;
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shooping</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={cartItems}
                  removeItem={this.removeItem}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>All right reserved.</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
