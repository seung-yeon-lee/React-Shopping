import React, { Component } from "react";
import { formats } from "../util";
import { Fade, Zoom } from "react-reveal";
import Modal from "react-modal";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productAction";

class Products extends Component {
  state = { product: null };
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { products, addToCart } = this.props;
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade={true}>
          {!products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {products.map((product) => (
                <li key={product.id}>
                  <div className="product">
                    <a href={"#" + product._id}>
                      <img
                        onClick={() => this.openModal(product)}
                        src={product.image}
                        alt={product.title}
                      />
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
          )}
        </Fade>

        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <h2>{product.title}</h2>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    선택가능한 사이즈 :
                    {product.size.map((v) => (
                      <span>
                        {" "}
                        <button className="button"> {v}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formats(product.price)}</div>
                    <button
                      onClick={() => {
                        this.closeModal();
                        addToCart(product);
                      }}
                      className="button"
                    >
                      장바구니에 담기
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect((state) => ({ products: state.product.items }), {
  fetchProducts,
})(Products);
