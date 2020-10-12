import React, { Component } from "react";
import { formats } from "../util";

export default class Products extends Component {
  render() {
    const { products, addToCart } = this.props;

    return (
      <div>
        <ul className="products">
          {products.map((product) => (
            <li key={product.id}>
              <div className="product">
                <a href={"#" + product._id}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formats(product.price)}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="button button-primary"
                  >
                    장바구니에 담기
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
