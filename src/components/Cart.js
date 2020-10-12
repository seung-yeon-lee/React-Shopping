import React, { Component } from "react";
import { formats } from "../util";
export default class Cart extends Component {
  render() {
    const { cartItems, removeItem } = this.props;

    return (
      <>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">선택한 상품이 없습니다</div>
        ) : (
          <div className="cart cart-header">
            총 {cartItems.length}개 상품을 선택하셨습니다
          </div>
        )}
        <>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formats(item.price)} X {item.count}개{"   "}
                      <button class="button" onClick={() => removeItem(item)}>
                        삭제하기
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div className="cart">
              <div className="total">
                <div>
                  합계 :{" "}
                  {formats(
                    cartItems.reduce((x, y) => x + y.price * y.count, 0)
                  )}
                </div>
                <button className="button button-primary">구매하기</button>
              </div>
            </div>
          )}
        </>
      </>
    );
  }
}
