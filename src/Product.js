import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import style from "./css/Product.module.css";

import products from "./data/products.json";

const changeList = ["熱賣商品", "價錢由高到低", "價錢由低到高"];

class Product extends Component {
  state = {
    inputValue: "",
    sort: 0,
    datail: null
  };
  onChangeEvent = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  };
  onSortChangeEvent = (e) => {
    const sort = Number(e.target.value);
    this.setState({ sort });
  };
  sortEvent = (filterList) => {
    const { sort } = this.state;
    if (sort === 0) return;
    if (sort === 1)
      return filterList.sort((a, b) => b.promote_price - a.promote_price);
    if (sort === 2)
      return filterList.sort((a, b) => a.promote_price - b.promote_price);
  };

  getProductDetail = (state) => {
    const { name, src, price, promote_price, variant } = state;
    this.setState({
      datail: {
        name,
        src,
        price,
        promote_price,
        variant
      }
    });
    console.log("d", this.state.datail);
  };

  render() {
    const { inputValue, sort } = this.state;
    const { addOrder } = this.props;

    const filterList = products.filter((product) =>
      product.name.toLowerCase().includes(inputValue)
    );

    this.sortEvent(filterList);

    return (
      <div className={style.products}>
        <label>
          <FontAwesomeIcon icon={faSearch} />
          <input value={inputValue} placeholder="SEARCH" onChange={this.onChangeEvent} />
        </label>
        <label> 排序 </label>
        <select value={sort} onChange={this.onSortChangeEvent}>
          {changeList.map((each, index) => (
            <option key={index} value={index}>
              {each}
            </option>
          ))}
        </select>
        <img
          className={style.banner}
          src={require("./img/ndis.jpg")}
          alt="Banner"
        />
        <ul>
          {filterList.map(
            ({ name, id, price, promote_price, src, variant }, index) => {
              return (
                <li className={style.card} key={index}>
                  <Link to={`/p/${id}`}>
                    <img src={require(`${src}`)} alt={name} />
                  </Link>

                  <h4 className={style.card__title}>
                    {name + " / " + variant}
                  </h4>
                  <div>
                    <span className={style.card__price}>{"NT" + price}</span>
                    <span className={style.card__promotePrice}>
                      {"NT" + promote_price}
                    </span>
                  </div>
                  <button
                    className={style.addCart}
                    onClick={addOrder.bind(this, id, 1)}
                  >
                    加入購物車
                  </button>
                </li>
              );
            }
          )}
          {filterList.length === 0 ? "很抱歉! 沒有找到相關商品" : null}
        </ul>
      </div>
    );
  }
}

export default Product;
