import React, { Component } from "react";

import Carousel from "./Carousel";
import style from "./css/home.module.css";

class Welcome extends Component {
  render() {
    return (
      <section className={style.home}>
        <Carousel />
      </section>
    );
  }
}

export default Welcome;
