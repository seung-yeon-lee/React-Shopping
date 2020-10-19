import React, { Component } from "react";
import { formats } from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import { connect } from "react-redux";
import { deleteCart, clearCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
import { Zoom } from "react-reveal";
import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

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
    const { name, email, address } = this.state;
    e.preventDefault();
    const order = {
      name: name,
      email: email,
      address: address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.count,
        0
      ),
    };
    this.props.createOrder(order);
    this.props.clearCart();
  };
  closeModal = () => {
    this.props.clearOrder();
  };
  render() {
    const { cartItems, deleteCart, order } = this.props;
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
                        <button
                          className="button"
                          onClick={() => deleteCart(item)}
                        >
                          삭제하기
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {order && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button className="close-modal" onClick={this.closeModal}>
                  X
                </button>
                <div className="order-detail">
                  <h3 className="success-message">
                    주문이 정상적으로 접수되었습니다
                  </h3>
                  <h2>주문자 : {order.name}</h2>
                  <ul>
                    <li>
                      <div>이메일:</div>
                      <div>{order.email}</div>
                    </li>
                    <li>
                      <div>주소:</div>
                      <div>{order.address}</div>
                    </li>
                    <li>
                      <div>거래 시간:</div>
                      <div>{order.createdAt}</div>
                    </li>
                    <li>
                      <div>선택한 상품:</div>
                      <div>
                        {order.cartItems.map((x) => (
                          <div>
                            {" "}
                            {x.title} {" X "} {x.count}
                            {"개"}
                          </div>
                        ))}
                      </div>
                    </li>
                    <li>
                      <div>총 가격:</div>
                      <div>{formats(order.total)}</div>
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Modal>
          )}

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
                            ref={this.focus}
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
  const order = state.order.order;

  return { cartItems, order };
};
const mapDispatchToProps = {
  deleteCart,
  createOrder,
  clearOrder,
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
