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
      cartItem: [],
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
    const cartItems = this.state.cartItem;
    let already = false;
    cartItems.map((item) => {
      if (item._id === product._id) {
        item.count++;
        already = true;
      }
    });
    if (!already) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItem: cartItems });
  };
  removeItem = (item) => {
    // para로 넘어온 id와 현재 state 주의 ex) list1 list2, list 2, list 1 ...
    const { cartItem } = this.state; // 모든 listitem
    const remove = cartItem.filter((v) => v._id !== item._id); //비교
    // 일치하면 false, 다르면 true 이므로  true로 state 최신(불일치는 냅두기)
    this.setState({ cartItem: remove });
  };

  render() {
    const { products, size, sort, cartItem } = this.state;
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
              <Cart cartItems={cartItem} removeItem={this.removeItem} />
            </div>
          </div>
        </main>
        <footer>All right reserved.</footer>
      </div>
    );
  }
}

export default App;
