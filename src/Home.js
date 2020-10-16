import React, { Component } from "react";

import Carousel from "./Carousel";
import style from "./css/home.module.css";

class Welcome extends Component {
  render() {
    return (
      <section className={style.home}>
        <Carousel />
        <div className={style.sectionHeader}>
          <h2>/ TRENDY LOOK. /</h2>
          <p>#2020AW #All you need, all unique</p>
        </div>
      </section>
    );
  }
}

export default Welcome;
