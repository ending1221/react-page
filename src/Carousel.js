import React, { useState } from "react";
import style from "./css/carousel.module.css";
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

  const changeImgIndex = (type) => {
    let length = carouselArr.length - 1;
    const num = type === "next" ? +1 : -1;
    const nowIndex = page + num;

    if (nowIndex > length) setPage(0);
    else if (nowIndex < 0) setPage(length);
    else setPage(nowIndex);
  };

  return (
    <div className={style.carousel}>
      <button
        className={style.control}
        data-slide="prev"
        onClick={() => changeImgIndex("prev")}
      >
        <FontAwesomeIcon className={style.controlItem} icon={faChevronLeft} />
      </button>
      <button
        className={style.control}
        data-slide="next"
        onClick={() => changeImgIndex("next")}
      >
        <FontAwesomeIcon className={style.controlItem} icon={faChevronRight} />
      </button>
      <div className={style.carouselInner}>
        {carouselArr.map((item, i) => {
          return (
            <div
              className={style.carouselItem}
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
