import React, { Component } from "react";

import style from "./css/Alert.module.css";

class Alert extends Component {
  render() {
    const {
      payEvent,
      pay,
      deleteOrder,
      deleteIndex,
      canel,
      handleCanel
    } = this.props;
    console.log("canel", canel);
    const payHtml = (
      <div className={style.outbox}>
        <div className={style.box}>
          <p>您已結帳，謝謝！</p>
          <div className={style.btn} onClick={payEvent}>
            關閉
          </div>
        </div>
      </div>
    );
    const deleteHtml = (
      <div className={canel ? style.outbox : style.displayNone}>
        <div className={style.box}>
          <span>是否刪除此商品?</span>
          <div>
            <button
              className={style.btn + " " + style.small}
              onClick={() => deleteOrder(deleteIndex)}
            >
              是
            </button>
            <button
              className={style.btn + " " + style.small}
              onClick={() => handleCanel(false)}
            >
              否
            </button>
          </div>
        </div>
      </div>
    );
    return pay ? payHtml : deleteHtml;
  }
}

export default Alert;
