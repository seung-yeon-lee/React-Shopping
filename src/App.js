import React, { Component } from "react";
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
      sort: sort,
      products: this.state.products
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

  render() {
    const { products, size, sort } = this.state;
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
              <Products products={products} />
            </div>
            <div className="sidebar">cart Item</div>
          </div>
        </main>
        <footer>All right reserved.</footer>
      </div>
    );
  }
}

export default App;
