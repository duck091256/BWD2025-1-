import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';
import '../styles/home.scss';
import ImageSlider from './ImageSlider';
import posterVideo01 from '../assets/images/home/poster-video-1.jpg';
import posterVideo02 from '../assets/images/home/poster-video-2.jpg';
import puLuong from '../assets/images/home/Pù luông - Thanh Hóa.jpg';
import tramChim from '../assets/images/home/Tràm Chim - Đồng Tháp.jpg';
import sapa from '../assets/images/home/Sapa - Lào Cai.jpg';
import cucPhuong from '../assets/images/home/Cúc phương - Ninh Bình.jpg';
import LangSinhThai from '../assets/images/home/Làng sinh thái núi rừng.jpg';
import NongTrai from '../assets/images/home/Nông trại hữu cơ.jpg';
import Homestay from '../assets/images/home/Homestay ven hồ.jpg';
import TourTraiNghiem from '../assets/images/home/Tour trải nghiệm cộng đồng.jpg';

// Variants cho hiệu ứng mờ dần và trượt lên
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Variants cho các phần tử con (stagger effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Hero Section Component
const HeroSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const destinations = [
    {
      id: 1,
      title: t('home.secondSection.title-img-1'),
      description: t('home.secondSection.sub-title-img-1'),
      image: puLuong
    },
    {
      id: 2,
      title: t('home.secondSection.title-img-2'),
      description: t('home.secondSection.sub-title-img-2'),
      image: tramChim
    },
    {
      id: 3,
      title: t('home.secondSection.title-img-3'),
      description: t('home.secondSection.sub-title-img-3'),
      image: sapa
    },
    {
      id: 4,
      title: t('home.secondSection.title-img-4'),
      description: t('home.secondSection.sub-title-img-4'),
      image: cucPhuong
    }
  ];

  return (
    <motion.div
      id="hero"
      ref={ref}
      className="home-odd-floor relative bg-green-100 py-20 px-6 text-center"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-green-700 mb-4"
        variants={childVariants}
      >
        {t('home.secondSection.title')}
      </motion.h1>
      <motion.p
        className="sub-title text-xl max-w-2xl mx-auto"
        variants={childVariants}
      >
        {t('home.secondSection.sub-title')}
      </motion.p>
      <motion.div className="mt-8" variants={childVariants} whileHover={{ scale: 1.06 }} transition={{ duration: 0.3 }}>
        <Link
          to="/tours"
          className="text-lg bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
        >
          {t('home.secondSection.button')}
        </Link>
      </motion.div>

      <div className="image-gallery-container">
        {destinations.map((destination) => (
          <motion.div
            key={destination.id}
            className="image-frame"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={destination.image}
              alt={destination.title}
              className="destination-image"
            />
            <motion.div
              className="tag"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="tag-title">{destination.title}</div>
              <div className="tag-desc">{destination.description}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};


// Why Choose Us Section
const WhyChooseUs = () => {
  const isDarkMode = document.body.classList.contains('dark-mode');

  const { t } = useTranslation();

  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const underlineRef = useRef(null);

  const features = [
    {
      title: t('home.thirdSection.first-frame-title'),
      description: t('home.thirdSection.first-frame-sub-title'),
      icon: "✓"
    },
    {
      title: t('home.thirdSection.second-frame-title'),
      description: t('home.thirdSection.second-frame-sub-title'),
      icon: "✆"
    },
    {
      title: t('home.thirdSection.third-frame-title'),
      description: t('home.thirdSection.third-frame-sub-title'),
      icon: "✈"
    },
  ];

  // Auto-rotate highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [features.length]);

  // Position the underline
  useEffect(() => {
    if (underlineRef.current) {
      const activeElement = document.querySelector(`.feature-item-${activeIndex}`);
      if (activeElement) {
        const { left, width } = activeElement.getBoundingClientRect();
        const containerLeft = underlineRef.current.parentElement.getBoundingClientRect().left;

        underlineRef.current.style.left = `${left - containerLeft}px`;
        underlineRef.current.style.width = `${width}px`;
      }
    }
  }, [activeIndex]);

  return (
    <motion.section
      id="why-choose-us"
      ref={ref}
      className="home-even-floor section-home py-16 px-3 bg-white relative"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        className="max-w-4xl mx-auto text-center mb-12"
        variants={childVariants}
      >
        <h2 className="title text-3xl font-bold mb-4">
          {t('home.thirdSection.title')}
        </h2>
        <div className="w-20 h-1 bg-green-600 mx-auto"></div>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative"
        variants={containerVariants}
      >
        {features.map((item, index) => (
          <motion.div
            key={index}
            className={`text-center px-6 py-8 feature-item-${index} ${activeIndex === index ? 'active-feature' : ''}`}
            variants={childVariants}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div
              className={`reason-icon text-4xl mb-4 transition-all duration-300 ${activeIndex === index ? 'scale-110' : ''}`}
              style={{
                color: activeIndex === index
                  ? (isDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#bbf7d0')  // text-green-200
                  : (isDarkMode ? 'rgba(255, 255, 255, 0.4)' : '#9ca3af') // text-gray-400
              }}
            >
              {item.icon}
            </div>

            <h3
              className="reason-title text-xl font-bold mb-3 transition-colors duration-300"
              style={{
                color: activeIndex === index
                  ? (isDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#1f2937')  // text-gray-800
                  : (isDarkMode ? 'rgba(255, 255, 255, 0.4)' : '#4b5563')  // text-gray-600
              }}
            >
              {item.title}
            </h3>

            <p
              className="reason-desc leading-relaxed transition-colors duration-300"
              style={{
                color: activeIndex === index
                  ? (isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#374151') // text-gray-700
                  : (isDarkMode ? 'rgba(255, 255, 255, 0.5)' : '#6b7280') // text-gray-500
              }}
            >
              {item.description}
            </p>

          </motion.div>
        ))}

        {/* Animated underline */}
        <div
          ref={underlineRef}
          className="absolute bottom-0 h-1 bg-green-600 transition-all duration-500 ease-in-out"
          style={{
            left: 0,
            width: '33%'
          }}
        />
      </motion.div>
    </motion.section>
  );
};

// Tính minHeight theo index
const getMinHeight = (index, isLargeScreen) => {
  const baseHeights = [70, 52.8, 44.3, 61.8];
  const height = baseHeights[index] || 61.8;
  return isLargeScreen ? `${height}%` : `${height - 10}%`;
};

// Vacation Section
const VacationSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [isLargeScreen, setIsLargeScreen] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const destinations = [
    {
      id: 1,
      title: t('home.fourthSection.iframe-1-title'),
      description: t('home.fourthSection.iframe-1-desc'),
      image: LangSinhThai
    },
    {
      id: 2,
      title: t('home.fourthSection.iframe-2-title'),
      description: t('home.fourthSection.iframe-2-desc'),
      image: NongTrai
    },
    {
      id: 3,
      title: t('home.fourthSection.iframe-3-title'),
      description: t('home.fourthSection.iframe-3-desc'),
      image: Homestay
    },
    {
      id: 4,
      title: t('home.fourthSection.iframe-4-title'),
      description: t('home.fourthSection.iframe-4-desc'),
      image: TourTraiNghiem
    }
  ];

  return (
    <motion.section
      className="home-odd-floor section-home flex items-center justify-center py-16 px-[3rem] bg-green-100"
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div className="max-w-6xl mx-auto">
        {/* Layout with two columns */}
        <motion.div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content - left side */}
          <motion.div className="lg:w-1/2 self-start text-left">
            <h1 className="title text-4xl font-bold mb-6">
              {t('home.fourthSection.title')}
            </h1>
            <div className="w-64 h-1 bg-green-600 mb-12"></div>
            <p className="sub-title text-xl mb-14">
              {t('home.fourthSection.desc')}
            </p>
            <motion.div
              className="relative flex lg:justify-start md:justify-center lg:origin-left"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.3 }}
            >
              <button className="bg-green-600 hover:bg-green-700 text-white font-base px-8 py-3 rounded-full text-lg transition-colors duration-300 shadow-md hover:shadow-lg lg:inline-block">
                {t('home.fourthSection.button')}
              </button>
            </motion.div>
          </motion.div>

          {/* Image grid - right side */}
          <motion.div className="lg:w-1/2 w-full">
            <Masonry
              breakpointCols={{
                default: 2,     // 2 cột trên desktop
                // 768: 1          // 1 cột trên mobile
              }}
              className="flex gap-6 md:gap-8"          // Khoảng cách ngang
              columnClassName="flex flex-col gap-6 md:gap-8" // Khoảng cách dọc
            >
              {destinations.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ml-[34.105px]"
                  style={{
                    // Sử dụng min-height và width linh hoạt
                    minHeight: getMinHeight(index, isLargeScreen),
                    width: index === 0 ? "100%" : index === 1 ? "80%" : index === 2 ? "100%" : "80%",
                    // Đảm bảo responsive
                    maxWidth: "100%",
                    aspectRatio:
                      index === 0 ? "4/3" :
                        index === 1 ? "1" :
                          index === 2 ? "16/9" :
                            "5/4"
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="destination-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

const VideoWithPoster = ({ url, poster }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-full aspect-video">
      {!isPlaying && (
        <img
          src={poster}
          alt="Poster"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setIsPlaying(true)}
        />
      )}
      {isPlaying && (
        <ReactPlayer
          url={url}
          playing
          muted
          loop
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};

// TourBlog Section
const TourBlogSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const content = [
    {
      type: "text",
      description: t('home.fifthSection.desc-1'),
      cta: t('home.fifthSection.button-1'),
    },
    {
      type: "video",
      src: "https://www.youtube.com/watch?v=OZtOMLxsfr4",
      poster: posterVideo01
    },
    {
      type: "video",
      src: "https://www.youtube.com/watch?v=9nYDcx31DlU",
      poster: posterVideo02
    },
    {
      type: "text",
      description: t('home.fifthSection.desc-2'),
      cta: t('home.fifthSection.button-2')
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="home-even-floor section-home py-16 px-[3rem] bg-white"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto">
        {/* Tiêu đề trên cùng bên trái */}
        <motion.h2
          className="text-4xl font-bold mb-3 ml-4"
          variants={childVariants}
        >
          {t('home.fifthSection.title')}
        </motion.h2>
        <div className="w-32 h-1 bg-green-600 ml-4"></div>

        {/* Grid layout 2x2 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {content.map((item, index) => (
            <motion.div
              key={index}
              className={`relative ${item.type === 'video' ? 'aspect-video' : 'min-h-[300px]'} rounded-xl overflow-hidden`}
              variants={childVariants}
            >
              {item.type === 'text' ? (
                <div className="h-full p-8 flex flex-col justify-center">
                  <span className={`text-9xl mb-[-30px] ${index === 3 ? 'self-end text-right w-full' : ''}`}>"</span>
                  <p className="text-xl mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <div
                    className={`
                      ${index === 3 ? 'flex justify-end' : ''}
                      ${index === 0 ? 'origin-left' : ''}
                    `}
                  >
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button className="self-start bg-green-600 text-white px-6 py-2 rounded-full font-base text-lg hover:bg-green-700 transition">
                        {item.cta}
                      </button>
                    </motion.div>
                  </div>
                </div>
              ) : item.src.includes('youtube.com') ? (
                <VideoWithPoster url={item.src} poster={item.poster} />
              ) : (
                <video
                  className='destination-image'
                  poster={item.poster}
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// Main Home Component
const Home = () => {
  return (
    <div className="home-page">
      <ImageSlider />
      <HeroSection />
      <WhyChooseUs />
      <VacationSection />
      <TourBlogSection />
    </div>
  );
};

export default Home;