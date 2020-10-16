import React, { Component } from "react";
import style from "./css/cart.module.css";

class Cart extends Component {
  state = {
    rate: 0
  };
  getTotalAmount = (orders) => {
    if (orders.length === 0) return 0;
    const amount = orders.map((order) => order.promote_price * order.count);
    const total = amount.reduce((a, b) => a + b);

    return total;
  };
  render() {
    const { orders, changeCount, handlePay } = this.props;
    const totalAmount = this.getTotalAmount(orders);
    const rate = totalAmount === 0 ? 0 : totalAmount >= 1000 ? 0 : 70;

    return (
      <section className={style.cart}>
        <h3>Shopping Bag</h3>
        <hr />
        {orders.length !== 0 ? (
          orders.map(
            ({ name, id, src, count, promote_price, variant }, index) => {
              return (
                <div className={style.product} key={index}>
                  <img src={require(`${src}`)} />
                  <div className={style.product__main}>
                    <h4 className={style.card__title}>{name}</h4>
                    <span>{"NT: " + promote_price}</span>
                    <span>Color: {variant}</span>
                    <div>
                      <span>Quantity : </span>
                      <button
                        onClick={changeCount.bind(this, "less", id, index)}
                      >
                        -
                      </button>
                      <span className={style.count}>{count}</span>
                      <button
                        onClick={changeCount.bind(this, "add", id, index)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <span className={style.emptyCard}>您的購物車為空!</span>
        )}

        <div>
          <hr />
          <span>商品總額: </span>
          <span>NT {totalAmount}</span>
        </div>
        <p>運費: NT {rate} (全館商品滿千免運)</p>
        <hr />
        <p>消費總額: NT {rate + totalAmount}</p>
        <div className={style.btn} onClick={handlePay.bind(this)}>
          結帳
        </div>
      </section>
    );
  }
}

export default Cart;
