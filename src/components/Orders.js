import React, { Component } from "react";
import { connect } from "react-redux";
import { formats } from "../util";
import { fetchOrders } from "../actions/orderActions";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }
  render() {
    const { orders } = this.props;

    return !orders ? (
      <div>모든 주문상품을 불러오는 중입니다.</div>
    ) : (
      <div className="orders">
        <h2>주문완료 상품</h2>
        <table>
          <thead>
            <tr>
              <th>주문자</th>
              <th>주문시간</th>
              <th>총 가격</th>
              <th>이메일</th>
              <th>주소</th>
              <th>주문상품</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order.name}</td>
                <td>{order.createdAt}</td>
                <td>{formats(order.total)}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>
                  {order.cartItems.map((item) => (
                    <div>
                      {item.count} {" x "} {item.title}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const orders = state.order.orders;
  console.log(orders);
  return { orders };
};

const mapDispatchToProps = {
  fetchOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
