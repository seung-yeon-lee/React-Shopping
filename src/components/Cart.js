import React, { Component } from "react";
import { formats } from "../util";
export default class Cart extends Component {
  state = { checkOut: false, name: "", email: "", address: "" };
  showCheckOut = () => {
    this.setState({ checkOut: true });
  };
  handleInput = (e) => {
    const {
      target: { name, value },
    } = e;
    this.setState({
      [name]: value,
    });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };
  render() {
    const { cartItems, removeItem } = this.props;
    const { name, email, address } = this.state;
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
            <>
              <div className="cart">
                <div className="total">
                  <div>
                    합계 :{" "}
                    {formats(
                      cartItems.reduce((x, y) => x + y.price * y.count, 0)
                    )}
                  </div>
                  <button
                    onClick={this.showCheckOut}
                    className="button button-primary"
                  >
                    결제하기
                  </button>
                </div>
              </div>
              {this.state.checkOut && (
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>이메일</label>
                        <input
                          value={email}
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={this.handleInput}
                          required
                        />
                      </li>
                      <li>
                        <label>이름</label>
                        <input
                          value={name}
                          type="text"
                          name="name"
                          placeholder="Name"
                          onChange={this.handleInput}
                          required
                        />
                      </li>
                      <li>
                        <label>주소</label>
                        <input
                          value={address}
                          type="text"
                          name="address"
                          placeholder="Address"
                          onChange={this.handleInput}
                          required
                        />
                      </li>
                      <li>
                        <button class="button-primary" type="submit">
                          주문하기
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </>
          )}
        </>
      </>
    );
  }
}
