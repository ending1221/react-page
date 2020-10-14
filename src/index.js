import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./scss/all.scss";
import style from "./css/index.module.css";

import Home from "./Home";
import Product from "./Product";
import Cart from "./Cart";
import Alert from "./Alert";
import Detail from "./ProductDetail";

import products from "./data/products.json";

const App = () => {
  const [orders, setOrders] = React.useState([]);
  const [ordersLength, setOrdersLength] = React.useState(0);
  const [canel, setCanel] = React.useState(false);
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const [pay, setPay] = React.useState(false);

  const checkNoRepeat = (id) => {
    return orders.filter((r) => r.id === id).length === 0;
  };

  const addOrder = (id, count = 1) => {
    console.log(id);
    const newProduct = checkNoRepeat(id);
    const nowProduct = products.find((product) => product.id === id);
    let newOrders = [...orders];
    console.log(nowProduct);
    if (newProduct) {
      nowProduct["count"] = count;
      newOrders.push(nowProduct);
    } else {
      newOrders = newOrders.map((each) => {
        if (each.id === id) {
          each.count += count;
        }
        return each;
      });
    }
    setOrders(newOrders);
    setOrdersLength(ordersLength + count);
    console.log("orders", orders);
    console.log("ordersLength", ordersLength);
  };

  const deleteOrder = (index) => {
    let newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
    setDeleteIndex(null);
    setCanel(false);
    getOrdersLength(newOrders);
  };

  const getOrdersLength = (newOrders) => {
    if (newOrders.length === 0) {
      setOrdersLength(0);
      return;
    }
    const counts = newOrders.map((product) => product.count);
    const val = counts.reduce((a, b) => a + b);
    setOrdersLength(val);
  };
  const changeCount = (type, id, index) => {
    const changeEvent = (product) => {
      product.count += type === "add" ? +1 : -1;

      if (product.count === 0) {
        product.count = 1;
        setCanel(true);
        setDeleteIndex(index);
        // deleteOrder(index);
        console.log(orders);
        return;
      }
      return product;
    };
    const newProduct = orders.map((order) =>
      order.id === id ? changeEvent(order, index) : ""
    );
    console.log("newProduct", newProduct[0] === undefined);
    if (newProduct[0] !== undefined)
      // setOrders([...newProduct]);
      console.log("orders", orders);
    getOrdersLength(orders);
  };
  const payEvent = () => {
    setOrders([]);
    setOrdersLength(0);
    setPay(!pay);
  };
  const handlePay = () => {
    setPay(!pay);
  };
  const handleCanel = (state) => {
    setCanel(state);
  };

  return (
    <Router>
      <div className="section">
        <div className={style.nav}>
          <p className={style.announcement}>
            歡迎來到 Yau shop ! 此網頁為 React.js 練習作品 圖源均來自
            <a href="https://www.ajpeace.com.tw/">《ajpeace官方網站》</a>
          </p>
          <ul className={style.nav__box}>
            <li className={style.nav__btn}>
              <Link to="/" className={style.nav__btn__link}>
                首頁
              </Link>
            </li>
            <li className={style.nav__btn}>
              <Link to="/products" className={style.nav__btn__link}>
                新品上市
              </Link>
            </li>
            <li className={style.nav__cart}>
              <Link to="/cart" className={style.nav__btn__link}>
                購物車({ordersLength})
              </Link>
            </li>
          </ul>
        </div>

        {/* {payBox ? <Modal payEvent={payEvent} /> : null} */}
        <Switch>
          <Route path="/products">
            <Product addOrder={addOrder} />
          </Route>
          <Route path="/product/:id">
            <Detail addOrder={addOrder} />
          </Route>
          <Route path="/cart">
            <Alert
              deleteOrder={deleteOrder}
              deleteIndex={deleteIndex}
              pay={pay}
              payEvent={payEvent}
              canel={canel}
              handleCanel={handleCanel}
            />
            <Cart
              orders={orders}
              changeCount={changeCount}
              handlePay={handlePay}
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
