import React, { Component } from "react";

import style from "./css/home.module.css";

class Welcome extends Component {
  render() {
    return (
      <div className={style.home}>
        <div className={style.card}>
          <h1>歡迎來到 Yau shop</h1>
          <h4>
            此網頁為 React.js 練習作品
            <br />
            圖源均來自
            <a href="https://www.ajpeace.com.tw/">《ajpeace官方網站》</a>
          </h4>
        </div>
      </div>
    );
  }
}

export default Welcome;
