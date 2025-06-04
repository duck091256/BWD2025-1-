import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import ReactPlayer from 'react-player';
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const destinations = [
    {
      id: 1,
      title: "Pù Luông - Thanh Hóa",
      description: "Ruộng bậc thang nối tiếp rừng núi xanh mát, bản làng dân tộc thân thiện – nơi lý tưởng để nghỉ dưỡng giữa thiên nhiên hoang sơ.",
      image: puLuong
    },
    {
      id: 2,
      title: "Tràm Chim - Đồng Tháp",
      description: "Khu rừng ngập nước nổi bật với hàng trăm loài chim quý, đưa du khách hòa mình vào hệ sinh thái đặc trưng miền Tây.",
      image: tramChim
    },
    {
      id: 3,
      title: "Sapa - Lào Cai",
      description: "Khí hậu mát mẻ quanh năm, cảnh sắc hùng vĩ với ruộng bậc thang và những cung đường trekking giữa núi rừng Tây Bắc.",
      image: sapa
    },
    {
      id: 4,
      title: "Cúc Phương - Ninh Bình",
      description: "Vườn quốc gia đầu tiên của Việt Nam, nổi bật với rừng nguyên sinh, động vật quý hiếm và các tuyến tham quan sinh thái hấp dẫn.",
      image: cucPhuong
    }
  ];

  return (
    <motion.div
      id="hero"
      ref={ref}
      className="relative bg-green-100 py-20 px-6 text-center"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-green-700 mb-4"
        variants={childVariants}
      >
        Khám phá Việt Nam Xanh
      </motion.h1>
      <motion.p
        className="text-xl max-w-2xl mx-auto text-gray-600"
        variants={childVariants}
      >
        Trải nghiệm thiên nhiên nguyên sơ, văn hóa bản địa và hành trình du lịch bền vững.
      </motion.p>
      <motion.div className="mt-8" variants={childVariants}>
        <Link
          to="/tours"
          className="text-lg bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
        >
          Khám phá ngay
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const underlineRef = useRef(null);

  const features = [
    {
      title: "Tried and Trusted",
      description: "We're trusted worldwide by 20 million travellers just like you.",
      icon: "✓"
    },
    {
      title: "Reliable Support",
      description: "We're here for you. Reach out anytime by phone, email, or chat.",
      icon: "✆"
    },
    {
      title: "One-stop Travel Partner",
      description: "Your search ends here. We've got your entire trip covered!",
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
      className="py-16 px-3 bg-white relative"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        className="max-w-4xl mx-auto text-center mb-12"
        variants={childVariants}
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Reason For Choosing Us</h2>
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
            <div className={`text-4xl mb-4 ${activeIndex === index ? 'text-green-200 scale-110' : 'text-gray-400'} transition-all duration-300`}>
              {item.icon}
            </div>
            <h3 className={`text-xl font-bold mb-3 ${activeIndex === index ? 'text-gray-800' : 'text-gray-600'} transition-colors duration-300`}>
              {item.title}
            </h3>
            <p className={`${activeIndex === index ? 'text-gray-700' : 'text-gray-500'} leading-relaxed transition-colors duration-300`}>
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
      title: "Làng Sinh Thái Núi Rừng",
      description: "Trải nghiệm nghỉ dưỡng giữa đại ngàn",
      image: LangSinhThai
    },
    {
      id: 2,
      title: "Nông Trại Hữu Cơ",
      description: "Tham quan, trồng rau, sống xanh mỗi ngày",
      image: NongTrai
    },
    {
      id: 3,
      title: "Homestay Ven Hồ",
      description: "Bình yên giữa thiên nhiên nguyên sơ",
      image: Homestay
    },
    {
      id: 4,
      title: "Tour Trải Nghiệm Cộng Đồng",
      description: "Khám phá văn hóa – bảo vệ môi trường",
      image: TourTraiNghiem
    }
  ];

  return (
    <motion.section
      className="flex items-center justify-center py-16 px-[3rem] bg-green-100"
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
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Trải nghiệm du lịch xanh tại Việt Nam
            </h1>
            <div className="w-64 h-1 bg-green-600 mb-12"></div>
            <p className="text-xl text-gray-600 mb-14">
              Cho dù bạn muốn thư giãn giữa thiên nhiên, tham gia các hoạt động ngoài trời, hay tìm hiểu văn hóa địa phương – du lịch xanh tại Việt Nam sẽ mang đến cho bạn trải nghiệm vừa thú vị vừa ý nghĩa.
              Từ những khu sinh thái ven rừng đến homestay thân thiện với môi trường, hành trình của bạn sẽ luôn hài hòa với thiên nhiên và cộng đồng.
            </p>
            <div className="relative flex lg:justify-start : md:justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white font-base px-8 py-3 rounded-full text-lg transition-colors duration-300 shadow-md hover:shadow-lg lg:inline-block">
                Đặt Ngay
              </button>
            </div>
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
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const content = [
    {
      type: "text",
      title: "Khám phá đồi chè xanh mướt",
      description: "Trải nghiệm cuộc sống nông thôn Việt Nam khi tham gia thu hoạch chè cùng người dân địa phương. Đắm mình trong cảnh sắc thiên nhiên hùng vĩ và nhịp sống yên bình nơi vùng cao.",
      cta: "Tìm hiểu thêm"
    },
    {
      type: "video",
      src: "https://www.youtube.com/watch?v=OZtOMLxsfr4", // Thay bằng URL video thực tế
      poster: posterVideo01
    },
    {
      type: "video",
      src: "https://www.youtube.com/watch?v=9nYDcx31DlU",
      poster: posterVideo02
    },
    {
      type: "text",
      title: "Đêm Hội An rực rỡ sắc màu",
      description: "Dạo bước trong không gian cổ kính, thưởng thức ánh đèn lồng lung linh và khám phá văn hóa truyền thống tại phố cổ Hội An – di sản văn hóa thế giới.",
      cta: "Khám phá ngay"
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="py-16 px-[3rem] bg-white"
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
          Blog Tour Của Chúng Tôi
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
                  <div className={`${index === 3 ? 'flex justify-end' : ''}`}>
                    <button className="self-start bg-green-600 text-white px-6 py-2 rounded-full font-base text-lg hover:bg-green-700 transition">
                      {item.cta}
                    </button>
                  </div>
                </div>
              ) : item.src.includes('youtube.com') ? (
                <VideoWithPoster url={item.src} poster={item.poster} />
              ) : (
                <video
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
    <div className="bg-white text-gray-800">
      <ImageSlider />
      <HeroSection />
      <WhyChooseUs />
      <VacationSection />
      <TourBlogSection />
    </div>
  );
};

export default Home;