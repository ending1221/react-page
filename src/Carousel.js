import React, { useState, useEffect } from "react";
import "./scss/carousel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const Carousel = () => {
  const [page, setPage] = useState(0);
  const arr = ["1", "2", "3", "4", "5", "6"];
  const carouselArr = arr.map((item) => {
    return "./img/index-0" + item + ".jpg";
  });
  const length = carouselArr.length;

  const changeImgIndex = (type) => {
    const num = type === "next" ? +1 : -1;
    const nowIndex = page + num;
    const newIndex = nowIndex % length === -1 ? 5 : nowIndex % length;
    setPage(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nowIndex = page + 1;
      setPage(nowIndex % length);
    }, 2500);

    return () => clearInterval(timer);
  }, [page]);

  return (
    <div className="carousel">
      <button
        className="control"
        data-slide="prev"
        onClick={() => changeImgIndex("prev")}
      >
        <FontAwesomeIcon className="controlItem" icon={faChevronLeft} />
      </button>
      <button
        className="control"
        data-slide="next"
        onClick={() => changeImgIndex("next")}
      >
        <FontAwesomeIcon className="controlItem" icon={faChevronRight} />
      </button>
      <div className="carouselInner">
        {carouselArr.map((item, i) => {
          return (
            <div
              className="carouselItem"
              key={i}
              style={{ left: `-${page * 100}%` }}
            >
              <img src={require(`${item}`)} alt="Banner" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
