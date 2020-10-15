import React, { useState, useEffect } from "react";
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
  const length = carouselArr.length - 1;

  const checkPage = (index) => {
    if (index > length) setPage(0);
    else if (index < 0) setPage(length);
    else setPage(index);
  };
  const changeImgIndex = (type) => {
    const num = type === "next" ? +1 : -1;
    const nowIndex = page + num;

    checkPage(nowIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nowIndex = page + 1;
      checkPage(nowIndex);
    }, 2500);

    return () => clearInterval(timer);
  }, [page]);

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
