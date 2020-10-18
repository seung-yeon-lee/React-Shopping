import React, { Component } from "react";
import { formats } from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { deleteCart } from "../actions/cartActions";

class Cart extends Component {
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
    const price = this.props.cartItems.reduce(
      (cur, items) => cur + items.price * items.count,
      0
    );
    const result = window.confirm(
      `${this.state.name}님이 선택하신 총 가격은 ${price}입니다 계속 진행하시겠습니까?`
    );
    if (result) {
      window.confirm("정상 처리되었습니다");
    }
    this.setState({ name: "", email: "", address: "" });
  };

  render() {
    const { cartItems, deleteCart } = this.props;
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
            <Fade left cascade={true}>
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
                        <button class="button" onClick={() => deleteCart(item)}>
                          삭제하기
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>

          {cartItems.length !== 0 && (
            <>
              <div className="cart">
                <div className="total">
                  <div>
                    총 금액 :{" "}
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
                <Fade right cascade>
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
                          <button class="button" type="submit">
                            주문하기
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </>
          )}
        </>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const cartItems = state.cart.cartItems;
  return { cartItems };
};
const mapDispatchToProps = {
  deleteCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
