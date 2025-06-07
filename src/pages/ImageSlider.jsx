
// Phrase 1

// import React, { useState, useEffect, memo, useRef } from 'react';
// import '../styles/about.scss';
// import greenTraveling1 from '../assets/images/home/green-traveling-1.jpg';
// import greenTraveling2 from '../assets/images/home/green-traveling-5.jpg';
// import greenTraveling3 from '../assets/images/home/green-traveling-2.jpg';
// import greenTraveling4 from '../assets/images/home/green-traveling-7.jpg';
// import greenTraveling5 from '../assets/images/home/green-traveling-8.jpg';
// import greenTraveling6 from '../assets/images/home/green-traveling-9.jpg';

// const SliderItem = memo(({ item, index, isInitialLoad }) => (
//   <div
//     className={`slider-item ${index === 0 ? 'first' : ''} ${index === 1 ? 'second' : ''} ${index >= 2 && index <= 4 && isInitialLoad ? 'initial-load' : ''
//       }`}
//     style={{ backgroundImage: `url(${item.image})` }}
//   >
//     {index === 1 && (
//       <div className="slider-content">
//         <div className="name">{item.name}</div>
//         <div className="des">{item.description}</div>
//         <button>See more</button>
//       </div>
//     )}
//   </div>
// ));

// const ImageSlider = () => {

//   const [items, setItems] = useState([
//     {
//       id: 1,
//       image: greenTraveling1,
//       name: 'LUNDEV',
//       description: 'Tình rủ anh đi chạy phố, chưa kịp chạy phố thì anh chạy mất tiêu',
//     },
//     {
//       id: 2,
//       image: greenTraveling2,
//       name: 'LUNDEV',
//       description: 'Tình rủ anh đi chạy phố, chưa kịp chạy phố thì anh chạy mất tiêu',
//     },
//     {
//       id: 3,
//       image: greenTraveling3,
//       name: 'LUNDEV',
//       description: 'Tình rủ anh đi chạy phố, chưa kịp chạy phố thì anh chạy mất tiêu',
//     },
//     {
//       id: 4,
//       image: greenTraveling4,
//       name: 'LUNDEV',
//       description: 'Tình rủ anh đi chạy phố, chưa kịp chạy phố thì anh chạy mất tiêu',
//     },
//     {
//       id: 5,
//       image: greenTraveling5,
//       name: 'LUNDEV',
//       description: 'Tình rủ anh đi chạy phố, chưa kịp chạy phố thì anh chạy mất tiêu',
//     },
//     {
//       id: 6,
//       image: greenTraveling6,
//       name: 'LUNDEV',
//       description: 'Tình rủ anh đi chạy phố, chưa kịp chạy phố thì anh chạy mất tiêu',
//     },
//   ]);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);

//   useEffect(() => {
//     // Tắt isInitialLoad sau 1.4s (thời gian dài nhất của animation showSliderItem)
//     const timer = setTimeout(() => {
//       setIsInitialLoad(false);
//     }, 1400);
//     return () => clearTimeout(timer);
//   }, []);

//   const slideRef = useRef(null);

//   const handleNext = () => {
//     let items = slideRef.current.querySelectorAll(".slider-item");
//     slideRef.current.appendChild(items[0]);
//   };

//   const handlePrev = () => {
//     let items = slideRef.current.querySelectorAll(".slider-item");
//     slideRef.current.prepend(items[items.length - 1]);
//   };

//   return (
//     <section className="slider-section">
//       <div className="slider-container">
//         <div id="slide" ref={slideRef}>
//           {items.map((item, index) => (
//             <SliderItem key={item.id} item={item} index={index} isInitialLoad={isInitialLoad} />
//           ))}
//         </div>
//         <div className="slider-buttons">
//           <button id="prev" onClick={handlePrev}>
//             <i className="fa-solid fa-angle-left"></i>
//           </button>
//           <button id="next" onClick={handleNext}>
//             <i className="fa-solid fa-angle-right"></i>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ImageSlider;

// Phrase 2

import { useRef, useState , useEffect} from "react";
import { useTranslation } from 'react-i18next';
import "../styles/ImageSlider.scss";
import { motion } from 'framer-motion';
import greenTraveling1 from "../assets/images/home/green-traveling-12.jpg";
import greenTraveling2 from "../assets/images/home/green-traveling-13.jpg";
import greenTraveling3 from "../assets/images/home/green-traveling-14.jpg";
import greenTraveling4 from "../assets/images/home/green-traveling-15.jpg";
import greenTraveling5 from "../assets/images/home/green-traveling-10.jpg";
import greenTraveling6 from "../assets/images/home/green-traveling-11.jpg";
import greenTraveling7 from "../assets/images/home/green-traveling-6.jpg";

const ImageSlider = () => {
  const { t } = useTranslation();
  const slideRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1400);

    const interval = setInterval(() => {
      handleClickNext();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    }
  }, []);

  const handleClickNext = () => {
    let items = slideRef.current.querySelectorAll(".slider-item");
    slideRef.current.appendChild(items[0]);
  };

  const handleClickPrev = () => {
    let items = slideRef.current.querySelectorAll(".slider-item");
    slideRef.current.prepend(items[items.length - 1]);
  };

  const data = [
    {
      id: 1,
      imgUrl: greenTraveling1,
      desc: t(`home.firstSection.item1.desc`),
      name: t(`home.firstSection.item1.name`),
    },
    {
      id: 2,
      imgUrl: greenTraveling2,
      desc: t(`home.firstSection.item2.desc`),
      name: t(`home.firstSection.item2.name`),
    },
    {
      id: 3,
      imgUrl: greenTraveling3,
      desc: t(`home.firstSection.item3.desc`),
      name: t(`home.firstSection.item3.name`),
    },
    {
      id: 4,
      imgUrl: greenTraveling4,
      desc: t(`home.firstSection.item4.desc`),
      name: t(`home.firstSection.item4.name`),
    },
    {
      id: 5,
      imgUrl: greenTraveling5,
      desc: t(`home.firstSection.item5.desc`),
      name: t(`home.firstSection.item5.name`),
    },
    {
      id: 6,
      imgUrl: greenTraveling6,
      desc: t(`home.firstSection.item6.desc`),
      name: t(`home.firstSection.item6.name`),
    },
    {
      id: 7,
      imgUrl: greenTraveling7,
      desc: t(`home.firstSection.item7.desc`),
      name: t(`home.firstSection.item7.name`),
    },
  ];

  return (
    <div className="slider-layer">
      <div className="slider-container">
        <div id="slide" ref={slideRef}>
          {data.map((item, index) => (
            <div
              key={item.id}
              className={`slider-item ${isInitialLoad ? 'initial-load' : ''} ${
                index === 0 ? 'first' : index === 1 ? 'second' : ''
              }`}
              style={{ backgroundImage: `url(${item.imgUrl})` }}
            >
              <div className="slider-content">
                <div className="name">{item.name}</div>
                <div className="des">{item.desc}</div>
                <button>{t(`home.firstSection.button`)}</button>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-buttons">
          <motion.button id="prev" onClick={handleClickNext} whileHover={{ scale: 1.06 }} transition={{ duration: 0.3 }}>
            <i className="fa-solid fa-angle-left"></i>
          </motion.button>
          <motion.button id="next" onClick={handleClickPrev} whileHover={{ scale: 1.06 }} transition={{ duration: 0.3 }}>
            <i className="fa-solid fa-angle-right"></i>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;