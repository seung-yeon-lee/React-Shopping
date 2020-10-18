import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productAction";

class Filter extends Component {
  sortProducts = (e) => {
    const { filteredProducts, sortProducts } = this.props;
    const {
      target: { value },
    } = e;
    sortProducts(filteredProducts, value);
  };

  filterProducts = (e) => {
    const {
      target: { value },
    } = e;
    const { filterProducts, products } = this.props;
    filterProducts(products, value);
  };

  render() {
    const { size, sort, filteredProducts } = this.props;

    return (
      <>
        {!filteredProducts ? null : (
          <div className="filter">
            <div className="filter-result">
              {filteredProducts.length}개의 상품이있습니다
            </div>
            <div className="filter-sort">
              정렬{" "}
              <select value={sort} onChange={this.sortProducts}>
                <option value="init">최신상품</option>
                <option value="lowest">낮은가격순</option>
                <option value="highest">높은가격순</option>
              </select>
            </div>
            <div className="filter-size">
              사이즈{" "}
              <select onChange={this.filterProducts}>
                <option value="">ALL</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const size = state.product.size;
  const sort = state.product.sort;
  const products = state.product.items;
  const filteredProducts = state.product.filteredItems;

  return { size, sort, products, filteredProducts };
};
const mapDispatchToProps = {
  filterProducts,
  sortProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
