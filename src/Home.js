import React, { Component } from "react";

import Carousel from "./Carousel";
import "./scss/home.scss";

import section1_1 from "./img/3010116620-01.jpg";
import section1_2 from "./img/4020128130-01.jpg";
import section2_1 from "./img/1020311050-01.jpg";
import section2_2 from "./img/1020126921-01.jpg";
import section2_3 from "./img/3010116610-01.jpg";
import section2_4 from "./img/1020126810-01.jpg";

class Welcome extends Component {
  render() {
    return (
      <section className="home">
        <Carousel />
        <div className="sectionHeader">
          <h2>/ TRENDY LOOK. /</h2>
          <p>#2020AW #All you need, all unique</p>
        </div>
        <div className="section_1">
          <img src={section1_1} alt="banner" />
          <img src={section1_2} alt="banner" />
        </div>
        <div className="sectionHeader">
          <h2>October version2</h2>
          <p>
            As temperatures drop outside, enjoy cosy moments inside. Discover
            relaxed and laid-back pieces, made for winter weekends at home.
          </p>
        </div>
        <div className="section_2">
          <img src={section2_1} alt="banner" />
          <img src={section2_2} alt="banner" />
          <img src={section2_3} alt="banner" />
          <img src={section2_4} alt="banner" />
        </div>
      </section>
    );
  }
}

export default Welcome;
