import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    const { count, size, sort, filterProducts, sortProducts } = this.props;
    return (
      <div className="filter">
        <div className="filter-result">{count}개의 상품이있습니다</div>
        <div className="filter-sort">
          정렬{" "}
          <select value={sort} onChange={sortProducts}>
            <option>최신상품</option>
            <option value="lowest">낮은가격순</option>
            <option value="highest">높은가격순</option>
          </select>
        </div>
        <div className="filter-size">
          사이즈{" "}
          <select value={size} onChange={filterProducts}>
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
    );
  }
}
