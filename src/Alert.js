import React, { Component } from "react";

import "./scss/alert.scss";

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
      <div className="outbox">
        <div className="box">
          <p>您已結帳，謝謝！</p>
          <div className="btn" onClick={payEvent}>
            關閉
          </div>
        </div>
      </div>
    );
    const deleteHtml = (
      <div className={canel ? "outbox" : "displayNone"}>
        <div className="box">
          <span>是否刪除此商品?</span>
          <div>
            <button
              className="btn small"
              onClick={() => deleteOrder(deleteIndex)}
            >
              是
            </button>
            <button className="btn small" onClick={() => handleCanel(false)}>
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
