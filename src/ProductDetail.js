import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "./data/products.json";
import style from "./css/productDetail.module.css";

function Detail(props) {
  const [count, setCount] = useState(1);
  const { id } = useParams();

  const countEvent = (type) => {
    let num = count + (type === "add" ? +1 : -1);
    num = num < 1 ? 1 : num;
    setCount(num);
  };
  const thisProduct = products.find((product) => id === product.id);
  if (thisProduct) {
    console.log(id, thisProduct);
    console.log("detail", props.detail);
    const { name, price, promote_price, src, variant } = thisProduct;
    const { addOrder } = props;
    return (
      <section className={style.detail}>
        <img src={require(`${src}`)} alt={name} />
        <div className={style.detail__text}>
          <h4 className={style.detail__text__title}>{name}</h4>
          <div className={style.prices}>
            <span className={style.detail__text__promotePrice}>
              {"NT" + promote_price}
            </span>
            <span className={style.detail__text__price}>{"NT" + price}</span>
          </div>
          <span>Color: {variant}</span>
          <div>
            <span>Quantity : </span>
            <button onClick={() => countEvent("less")}>-</button>
            <span className={style.count}>{count}</span>
            <button onClick={() => countEvent("add")}>+</button>
          </div>
          <button className={style.addCart} onClick={() => addOrder(id, count)}>
            加入購物車
          </button>
          <span className={style.description}>
            <span>商品描述</span>
            <hr />
            <span>產地/中國</span>
            <span>口袋/無</span>
            <span>內裡/無</span>
            <span>彈性/無</span>
            <span>材質/棉+聚脂纖維</span>
            <span>商品長度/略長</span>
            <span>商品版型/偏大</span>
            <span>商品厚薄/偏薄</span>
            <span>※布料混紗/印花些微印刷不均/斑駁，屬正常現象，非瑕疵狀況</span>
          </span>
        </div>
      </section>
    );
  } else {
    return <div className={style.none}>查無此商品</div>;
  }
}

export default Detail;
