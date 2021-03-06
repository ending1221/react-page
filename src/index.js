import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

import "./scss/layout.scss";
import "./scss/index.scss";

import Home from "./Home";
import Product from "./Product";
import Cart from "./Cart";
import Alert from "./Alert";
import Detail from "./ProductDetail";

import products from "./data/products.json";

import cartImg from "./img/order.png";

const App = () => {
  const [orders, setOrders] = React.useState([]);
  const [ordersLength, setOrdersLength] = React.useState(0);
  const [canel, setCanel] = React.useState(false);
  const [deleteIndex, setDeleteIndex] = React.useState(null);
  const [pay, setPay] = React.useState(false);
  const [scrollTop, setScrollTop] = React.useState(false);

  const checkNoRepeat = (id) => {
    return orders.filter((r) => r.id === id).length === 0;
  };

  const addOrder = (id, count = 1) => {
    const newProduct = checkNoRepeat(id);
    const nowProduct = products.find((product) => product.id === id);
    let newOrders = [...orders];
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
  const scrollEvent = () => {
    window.addEventListener("scroll", function (e) {
      var sr = document.documentElement.scrollTop;
      if (sr > 500) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  scrollEvent();

  return (
    <Router>
      <div className="section">
        <button
          className={scrollTop ? "scrollTop" : "displayNone"}
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <div className="nav">
          <p className="announcement">
            歡迎來到 Yau shop ! 此網頁為 React.js 練習作品 圖源均來自
            <a href="https://www.ajpeace.com.tw/">《ajpeace官方網站》</a>
          </p>
          <ul className="nav__box">
            <li className="nav__btn">
              <Link to="/" className="nav__btn__link">
                首頁
              </Link>
            </li>
            <li className="nav__btn">
              <Link to="/products" className="nav__btn__link">
                新品上市
              </Link>
            </li>
            <li className="nav__cart">
              <Link to="/cart" className="nav__btn__link">
                <img src={cartImg} alt="cart" />
                {ordersLength}
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
