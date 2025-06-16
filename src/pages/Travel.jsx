import React, { useState } from "react";
import hanoiImg from '../assets/images/travel/hanoi1.jpg';
import danangImg from '../assets/images/travel/danang.jpeg';
import hoianImg from '../assets/images/travel/hoian.jpg';
import nhatrangImg from '../assets/images/travel/langson1.jpg';
import phuquocImg from '../assets/images/travel/vungtau1.jpg';
import image1Img from '../assets/images/travel/image1.webp';
import image2Img from '../assets/images/travel/image2.jpg';
import image3Img from '../assets/images/travel/image3.jpg';
import aboutImg from '../assets/images/travel/about.jfif';
import service1Img from '../assets/images/travel/service1.png';
import service2Img from '../assets/images/travel/service2.png';
import service3Img from '../assets/images/travel/service3.png';
import dalatImg from '../assets/images/travel/dalat.jpg';
import hochiminhImg from '../assets/images/travel/hochiminh.webp';
import hagiangImg from '../assets/images/travel/hagiang.jpg';
import hueImg from '../assets/images/travel/hue.jpg';
import quotationImg from '../assets/images/travel/quotation.png';
import video12 from '../assets/images/travel/12.mp4';
import '../styles/travel.scss';
import { useTranslation } from 'react-i18next';

const tourData = [
  {
    id: 1,
    name: "Du lịch sinh thái-Hà Nội",
    description: "Hà Nội, thủ đô của Việt Nam, nổi tiếng với kiến trúc trăm tuổi...",
    img: hanoiImg,
    price: "3.500.000₫",
    suggestions: [
      "CMND/CCCD hoặc hộ chiếu",
      "Quần áo phù hợp thời tiết miền Bắc (nên xem dự báo thời tiết)",
      "Ô/dù nhỏ tiện lợi",
      "Tiền mặt/thẻ ngân hàng",
      "Đồ dùng cá nhân",
      "Thuốc cảm cúm, dị ứng",
      "Máy ảnh hoặc điện thoại chụp hình"
    ]
  },
  {
    id: 2,
    name: "Tour Đà Nẵng",
    description: "Đà Nẵng là thành phố lớn nhất của miền Trung...",
    img: danangImg,
    price: "4.200.000₫",
    suggestions: [
      "Kem chống nắng",
      "Kính râm/nón rộng vành",
      "Áo bơi và đồ bơi nếu đi biển",
      "CMND/CCCD hoặc hộ chiếu",
      "Giày dép đi biển/sandals",
      "Đồ dùng cá nhân",
      "Máy ảnh, sạc dự phòng"
    ]
  },
  {
    id: 3,
    name: "Tham quan Hội An",
    description: "Phố cổ Hội An từng là một thương cảng quốc tế sầm uất...",
    img: hoianImg,
    price: "3.900.000₫",
    suggestions: [
      "CMND/CCCD hoặc hộ chiếu",
      "Quần áo nhẹ, thoáng mát",
      "Giày thể thao hoặc giày sandal thoải mái",
      "Đèn pin mini (khám phá phố cổ buổi tối)",
      "Máy ảnh/điện thoại chụp hình",
      "Tiền mặt/thẻ ngân hàng",
      "Thuốc chống côn trùng"
    ]
  },
  {
    id: 4,
    name: "Trải nghiệm du lịch Lạng Sơn",
    description: "Lạng Sơn là một tỉnh miền núi phía Bắc Việt Nam, nổi tiếng với cảnh quan thiên nhiên hùng vĩ...",
    img: nhatrangImg,
    price: "5.100.000₫",
    suggestions: [
      "CMND/CCCD hoặc hộ chiếu",
      "Áo khoác nhẹ hoặc áo gió (nhiệt độ có thể chênh lệch lớn vào sáng/tối)",
      "Giày leo núi hoặc giày thể thao",
      "Đồ dùng cá nhân",
      "Thuốc men cơ bản, dầu gió",
      "Bình nước cá nhân",
      "Máy ảnh, ống nhòm (nếu đi ngắm cảnh)"
    ]
  },
  {
    id: 5,
    name: "Chuyến đi Vũng Tàu",
    description: "Vũng Tàu là một thành phố biển nổi tiếng với bãi biển đẹp và các hoạt động giải trí đa dạng...",
    img: phuquocImg,
    price: "5.600.000₫",
    suggestions: [
      "CMND/CCCD hoặc hộ chiếu",
      "Đồ bơi, kính bơi",
      "Kem chống nắng",
      "Mũ rộng vành, kính râm",
      "Dép tông hoặc sandals đi biển",
      "Đồ dùng cá nhân",
      "Máy ảnh, GoPro"
    ]
  }
];

function Modal({ show, onClose, children }) {
  if (!show) return null;
  return (
    <div className="modal-travel" style={{ display: "block" }} onClick={e => e.target.className === "modal-travel" && onClose()}>
      <div className="modal-travel-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <div id="modalBody">{children}</div>
      </div>
    </div>
  );
}

function Travel() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    location: "0",
    people: "",
    start: "",
    end: ""
  });
  const [modalContent, setModalContent] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields
    if (form.location === "0") {
      setModalContent(<p style={{ color: "red" }}>Hãy chọn địa điểm bạn muốn đi!</p>);
      return;
    }
    if (!form.people || Number(form.people) < 1) {
      setModalContent(<p style={{ color: "red" }}>Hãy nhập số người hợp lệ!</p>);
      return;
    }
    if (!form.start) {
      setModalContent(<p style={{ color: "red" }}>Hãy chọn ngày đi!</p>);
      return;
    }
    if (!form.end) {
      setModalContent(<p style={{ color: "red" }}>Hãy chọn ngày về!</p>);
      return;
    }
    // Validate ngày đi phải từ hôm nay trở đi, ngày về phải sau ngày đi
    const now = new Date();
    now.setHours(0, 0, 0, 0); // set to 0h for accurate comparison
    const startDate = new Date(form.start);
    const endDate = new Date(form.end);

    if (startDate < now) {
      setModalContent(<p style={{ color: "red" }}>Ngày đi phải từ hôm nay trở đi!</p>);
      return;
    }

    if (endDate <= startDate) {
      setModalContent(<p style={{ color: "red" }}>Ngày về phải sau ngày đi!</p>);
      return;
    }

    const tour = tourData.find(t => t.id === Number(form.location));
    if (tour) {
      setModalContent(
        <div style={{ textAlign: "center" }}>
          <img src={tour.img} alt={tour.name} style={{ width: "90%", maxWidth: 230, height: 120, objectFit: "cover", borderRadius: 10, boxShadow: "0 2px 12px #0def3a44" }} />
          <h2 style={{ color: "#0def3a", margin: "15px 0 8px" }}>{tour.name}</h2>
          <p style={{ fontSize: 16 }}>{tour.description}</p>
          <div style={{ fontSize: 17, margin: "10px 0 8px 0" }}>
            <b>Giá tour: <span style={{ color: "#e53935" }}>{tour.price}</span></b>
          </div>
          <button className="btn" style={{ marginTop: 10, width: 120 }} onClick={() => alert("Đặt tour thành công!")}>
            Đặt tour
          </button>
          <hr style={{ margin: "18px 0" }} />
          <div style={{ textAlign: "left" }}>
            <h3 style={{ color: "#0def3a" }}>Gợi ý đồ cần chuẩn bị:</h3>
            <ul style={{ paddingLeft: 18, lineHeight: 1.7, fontSize: 15 }}>
              {tour.suggestions.map((item, idx) => <li key={idx}>✔️ {item}</li>)}
            </ul>
          </div>
        </div>
      );
    }
  };

  const handleCloseModal = () => setModalContent(null);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const featuredTours = t('travel.secondSection.tours', { returnObjects: true });
  const tourImages = [image1Img, image2Img, image3Img];

  const aboutData = t('travel.thirdSection.whyChooseUs', { returnObjects: true });
  const services = t('travel.thirdSection.services', { returnObjects: true });
  const serviceImages = [service1Img, service2Img, service3Img];

  return (
    <div className="travel-container">
      <header>
        <div className="video-container">
          <video src={video12} autoPlay muted loop onContextMenu={(e) => e.preventDefault()}
            style={{
              pointerEvents: 'none',
              userSelect: 'none'
            }} />
        </div>
        <div className="header-content">
          <h1>{t('travel.firstSection.title')}</h1>
          <p>{t('travel.firstSection.subtitle')}</p>

          <form onSubmit={handleSubmit} className="travel-form">
            <h1>{t('travel.firstSection.form.title')}</h1>
            <p>{t('travel.firstSection.form.location.label')}</p>
            <select name="location" value={form.location} onChange={handleChange}>
              <option value="0">{t('travel.firstSection.form.location.placeholder')}</option>
              <option value="1">{t('travel.firstSection.form.location.options.hanoi')}</option>
              <option value="2">{t('travel.firstSection.form.location.options.danang')}</option>
              <option value="3">{t('travel.firstSection.form.location.options.hoian')}</option>
              <option value="4">{t('travel.firstSection.form.location.options.nhatrang')}</option>
              <option value="5">{t('travel.firstSection.form.location.options.phuquoc')}</option>
            </select>
            <p>{t('travel.firstSection.form.people.label')}</p>
            <input name="people" type="number" min="1" placeholder={t('travel.firstSection.form.people.placeholder')} value={form.people} onChange={handleChange} />
            <p>{t('travel.firstSection.form.startDate.label')}</p>
            <input name="start" type="date" value={form.start} onChange={handleChange} />
            <p>{t('travel.firstSection.form.endDate.label')}</p>
            <input name="end" type="date" value={form.end} onChange={handleChange} />
            <button type="submit">{t('travel.firstSection.form.submit')}</button>
          </form>
        </div>
      </header>

      <section className="nice-place">
        <div className="container">
          <h1 className="h1-style">{t('travel.secondSection.featuredToursTitle')}</h1>
          <div className="nice-place-content row">
            {featuredTours.map((tour, index) => (
              <div className="nice-place-item" key={index}>
                <div className="nice-place-item-img">
                  <img src={tourImages[index]} alt={tour.title} />
                </div>
                <div className="nice-place-item-text">
                  <h2>{tour.title}</h2>
                  <div className="star-group">
                    {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                  </div>
                  <p>{tour.description}</p>
                  <button className="btn">{tour.button}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <h1 className="h1-style">{t('travel.thirdSection.aboutTitle')}</h1>
          <div className="about-content row">
            <div className="about-content-left">
              <img src={aboutImg} alt={aboutData.title} />
            </div>
            <div className="about-content-right">
              <h2>{aboutData.title}</h2>
              <p>{aboutData.description}</p>
              <button className="btn">{aboutData.button}</button>
            </div>
          </div>
          <div className="service row">
            {services.map((service, index) => (
              <div className="service-item" key={index}>
                <img src={serviceImages[index]} alt={service.name} />
                <p>{service.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tour-summer">
        <div className="container">
          <h1 className="h1-style">Tour hè 2025</h1>
          <div className="tour-summer-content row">
            <div className="tour-summer-content-item row ">
              <div className="tour-summer-content-item-img">
                <img src={dalatImg} alt="Đà Lạt" />
              </div>
              <div className="tour-summer-content-item-text">
                <h2>Đà Lạt</h2>
                <p>Đà Lạt là thành phố tỉnh lỵ trực thuộc tỉnh Lâm Đồng, nằm trên cao nguyên Lâm Viên, thuộc vùng Tây Nguyên, Việt Nam.</p>
                <button className="btn">Khám phá</button>
              </div>
            </div>
            <div className="tour-summer-content-item row ">
              <div className="tour-summer-content-item-img">
                <img src={hoianImg} alt="Hội An" />
              </div>
              <div className="tour-summer-content-item-text">
                <h2>Hội An</h2>
                <p>Phố cổ Hội An từng là một thương cảng quốc tế sầm uất, gồm những di sản kiến trúc đã có từ hàng trăm năm trước, được UNESCO công nhận là di sản văn hóa thế giới từ năm 1999.</p>
                <button className="btn">Khám phá</button>
              </div>
            </div>
            <div className="tour-summer-content-item row ">
              <div className="tour-summer-content-item-img">
                <img src={hochiminhImg} alt="Hồ Chí Minh" />
              </div>
              <div className="tour-summer-content-item-text">
                <h2>Hồ Chí Minh</h2>
                <p>Thành phố Hồ Chí Minh (thường được gọi là Sài Gòn) là một thành phố ở miền nam Việt Nam nổi tiếng với vai trò nòng cốt trong chiến tranh Việt Nam.</p>
                <button className="btn">Khám phá</button>
              </div>
            </div>
            <div className="tour-summer-content-item row ">
              <div className="tour-summer-content-item-img">
                <img src={danangImg} alt="Đà Nẵng" />
              </div>
              <div className="tour-summer-content-item-text">
                <h2>Đà Nẵng</h2>
                <p>Đà Nẵng là thành phố lớn nhất của miền Trung, đóng vai trò là trung tâm chính trị, kinh tế - xã hội lớn của miền Trung và là hạt nhân quan trọng trong Vùng kinh tế trọng điểm miền Trung.</p>
                <button className="btn">Khám phá</button>
              </div>
            </div>
            <div className="tour-summer-content-item row ">
              <div className="tour-summer-content-item-img">
                <img src={hagiangImg} alt="Hà Giang" />
              </div>
              <div className="tour-summer-content-item-text">
                <h2>Hà Giang</h2>
                <p>Thành phố Hà Giang là trung tâm kinh tế, chính trị của tỉnh Hà Giang, nằm ở vị trí trung tâm của tỉnh, cách cửa khẩu Thanh Thủy trên biên giới Việt Nam.</p>
                <button className="btn">Khám phá</button>
              </div>
            </div>
            <div className="tour-summer-content-item row ">
              <div className="tour-summer-content-item-img">
                <img src={hueImg} alt="Huế" />
              </div>
              <div className="tour-summer-content-item-text">
                <h2>Huế</h2>
                <p>Thành phố Huế lúc bấy giờ có địa giới hành chính tương ứng với các quận Phú Xuân và Thuận Hóa hiện nay. Huế từng là kinh đô của Việt Nam dưới triều Tây Sơn và triều Nguyễn.</p>
                <button className="btn">Khám phá</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="review">
        <div className="container">
          <h1 className="h1-style">Đánh giá</h1>
          <div className="review-content row">
            <div className="review-item">
              <div className="review-item-text">
                <img src={quotationImg} alt="" />
                <p><span>&ldquo;</span>Khung cảnh sương mù Đà Lạt vào buổi sớm thật sự rất tuyệt!<span>&rdquo;</span></p>
              </div>
              <div className="review-item-img row">
                {/* <img src={review1Img} alt="" /> */}
                <div className="review-item-img-text">
                  <h2>Trần Thanh Đức</h2>
                  <p>Ngày 23/3/2025</p>
                </div>
              </div>
            </div>
            <div className="review-item">
              <div className="review-item-text">
                <img src={quotationImg} alt="" />
                <p><span>&ldquo;</span>Cố đô Huế mãi đỉnh, mãi là nhất trong lòng tôi!<span>&rdquo;</span></p>
              </div>
              <div className="review-item-img row">
                {/* <img src={review2Img} alt="" /> */}
                <div className="review-item-img-text">
                  <h2>Nguyễn Hữu Quốc Bảo</h2>
                  <p>Ngày 19/4/2025</p>
                </div>
              </div>
            </div>
            <div className="review-item">
              <div className="review-item-text">
                <img src={quotationImg} alt="" />
                <p><span>&ldquo;</span>Khung cảnh thiên nhiên ở Tây Nguyên nó đẹp một cách kỳ lạ!<span>&rdquo;</span></p>
              </div>
              <div className="review-item-img row">
                {/* <img src={review3Img} alt="" /> */}
                <div className="review-item-img-text">
                  <h2>Lê Hoài Đức</h2>
                  <p>Ngày 19/5/2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={!!modalContent} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default Travel;