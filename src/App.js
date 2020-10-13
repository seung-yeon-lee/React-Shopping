import React, { Component } from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }
  filterProducts = (e) => {
    const {
      target: { value },
    } = e;
    if (value === "") {
      this.setState({ size: value, products: data.products });
    } else {
      this.setState({
        size: value,
        products: data.products.filter(
          (product) => product.size.indexOf(value) >= 0
        ),
      });
    }
  };
  sortProducts = (e) => {
    const sort = e.target.value;
    this.setState((state) => ({
      sort,
      products: state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
  };
  addToCart = (product) => {
    const cartItems = this.state.cartItems;
    let already = true;
    cartItems.map((item) => {
      //처리과정 지난 후 수량으로인해 먼저 작성
      if (item._id === product._id) {
        item.count++;
        already = false;
      }
    });
    if (already) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    // 새로고침 시 모든 장바구니가 사라짐, 스토리지로 심플하게 관리
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeItem = (item) => {
    // para로 넘어온 id와 현재 state 주의 ex) list1 list2, list 2, list 1 ...
    const { cartItems } = this.state; // 모든 listitem
    const remove = cartItems.filter((v) => v._id !== item._id); // 불일치 정보만 저장
    this.setState({ cartItems: remove });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((v) => v._id !== item._id))
    );
  };

  createOrder = (order) => {
    const q = order.cartItems.map((v) => [v.title, v.price]);
    const result = window.confirm(`${order.name} ${q[0]} ${q[1]} 상품`);
    if (result) {
      window.confirm("정상 처리 되었습니다");
    }
  };

  render() {
    const { products, size, sort, cartItems } = this.state;
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shooping</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={products.length}
                size={size}
                sort={sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={products} addToCart={this.addToCart} />
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
    );
  }
}

export default App;
