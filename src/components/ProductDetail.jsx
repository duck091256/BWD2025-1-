import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../styles/productDetail.scss'; // Thêm CSS cho trang chi tiết sản phẩm

const productData = [
  {
    id: '1',
    name: 'Kính mát thời trang',
    price: { current: '₫45.900', old: '₫90.000', discount: '-50%' },
    description: 'Kính thời trang, bảo vệ mắt khỏi ánh nắng mặt trời.',
    images: [
      '../img/product1.png',
      '../img/product1-1.png',
      '../img/product1-2.png'
    ],
    options: { colors: ['Đen', 'Xám', 'Nâu'] },
  },
  {
    id: '2',
    name: 'Bình nước inox',
    price: { current: '₫150.000', old: '₫200.000', discount: '-25%' },
    description: 'Bình nước inox giữ nhiệt, dung tích 500ml.',
    images: [
      '../img/product2.png',
      '../img/product2-1.png',
      '../img/product2-2.png'
    ],
    options: { colors: ['Navy', 'Đen', 'Đỏ'] },
  },
  {
    id: '3',
    name: 'Giỏ dã ngoại',
    price: { current: '₫250.000', old: '₫300.000', discount: '-17%' },
    description: "Giỏ dã ngoại dung tích lớn, dễ dàng mang theo.",
    images: [
      '../img/product3.png',
      '../img/product3-1.png',
      '../img/product3-2.png'
    ],
    options: { colors: ['Hồng', 'Vàng', 'Xanh lá'] },
  },
  {
    id: '4',
    name: 'Kem chống nắng',
    price: { current: '₫120.000', old: '₫150.000', discount: '-20%' },
    description: 'Kem chống nắng SPF 50+, bảo vệ da khỏi tác hại của ánh nắng mặt trời.',
    images: [
      '../img/product4.png',
      '../img/product4-1.png',
      '../img/product4-2.png'
    ],
    options: { colors: ['Xanh lá', 'Hồng', 'Xanh'] },
  },
  {
    id: '5',
    name: 'Khăn tắm sợi tre',
    price: { current: '₫80.000', old: '₫100.000', discount: '-20%' },
    description: 'Khăn tắm sợi tre mềm mại, thấm hút tốt.',
    images: [
      '../img/product5.png',
      '../img/product5-1.png',
      '../img/product5-2.png'
    ],
    options: { colors: ['Xanh', 'Cam', 'Hồng'] },
  },

  {
    id: '6',
    name: 'Túi đan thủ công',
    price: { current: '₫100.000', old: '₫150.000', discount: '-14%' },
    description: 'Túi đan thủ công, phong cách vintage.',
    images: [
      '../img/product6.png',
      '../img/product6-1.png',
      '../img/product6-2.png'
    ],
    options: { colors: ['Đỏ', 'Be', 'Kaki'] },
  },
  {
    id: '7',
    name: 'Thảm picnic',
    price: { current: '₫200.000', old: '₫250.000', discount: '-20%' },
    description: 'Thảm picnic bằng vải tái chế, chống thấm nước, dễ dàng vệ sinh.',
    images: [
      '../img/product7.png',
      '../img/product7-1.png',
      '../img/product7-2.png'
    ],
    options: { colors: ['Vàng', 'Hồng', 'Xanh'] },
  },
  {
    id: '8',
    name: 'Đèn pin năng lượng mặt trời',
    price: { current: '₫250.000', old: '₫300.000', discount: '-17%' },
    description: 'Đèn pin năng lượng mặt trời, tiết kiệm điện năng.',
    images: [
      '../img/product8.png',
      '../img/product8-1.png',
      '../img/product8-2.png'
    ],
    options: { colors: ['Xanh lá', 'Đen', 'Vàng'] },
  },
  {
    id: '9',
    name: 'Balo du lịch',
    price: { current: '₫500.000', old: '₫600.000', discount: '-17%' },
    description: 'Balo du lịch chống nước, dung tích lớn, phù hợp cho các chuyến đi dài ngày.',
    images: [
      '../img/product9.png',
      '../img/product9-1.png',
      '../img/product9-2.png'
    ],
    options: { colors: ['Đen', 'Xanh', 'Xám'] },
  },
  {
    id: '10',
    name: 'Nón du lịch',
    price: { current: '₫50.000', old: '₫70.000', discount: '-17%' },
    description: 'Nón du lịch chống nắng, có thể gấp gọn lại dễ dàng.',
    images: [
      '../img/product10.png',
      '../img/product10-1.png',
      '../img/product10-2.png'
    ],
    options: { colors: ['Be', 'Trắng', 'Cà phê'] },
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = productData.find(p => p.id === id);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images?.[0] || '');
  const [modalOpen, setModalOpen] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({ name: '', address: '', phone: '' });

  useEffect(() => {
    emailjs.init('ucpvNgWaQb5t7FmhM');
  }, []);

  if (!product) return <p style={{ textAlign: 'center' }}>Sản phẩm không tồn tại!</p>;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Vui lòng chọn màu và size trước khi thêm vào giỏ hàng!');
      return;
    }

    const cartItem = {
      name: product.name,
      price: Number(product.price.current.replace(/[₫\.\,]/g, '')), // chuyển sang số nguyên
      image: mainImage,
      color: selectedColor,
      size: selectedSize,
      quantity,
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize || quantity <= 0) {
      alert('Vui lòng chọn đầy đủ thông tin trước khi mua!');
      return;
    }
    setModalOpen(true);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    emailjs
      .send('dulichxanhastral', 'template_j7ah4od', {
        product_name: product.name,
        product_price: product.price.current,
        product_color: selectedColor,
        product_size: selectedSize,
        product_quantity: quantity,
        buyer_name: buyerInfo.name,
        buyer_address: buyerInfo.address,
        buyer_phone: buyerInfo.phone
      })
      .then(() => {
        alert('Đặt hàng thành công! Email đã được gửi.');
        setModalOpen(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi email:', error);
        alert('Có lỗi xảy ra khi gửi email.');
      });
  };

  return (
    <div className="product-detail">
      <div className="product-images">
        <div className="main-image">
          <img src={mainImage} alt="Hình ảnh sản phẩm" />
        </div>
        <div className="image-thumbnails">
          {product.images.map((img, index) => (
            <img key={index} className="thumbnail" src={img} alt={`Hình ảnh ${index + 1}`} onClick={() => setMainImage(img)} />
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="current-price">{product.price.current}</span>
          <span className="old-price">{product.price.old}</span>
          <span className="discount">{product.price.discount}</span>
        </div>

        <div className="product-options">
          <div className="option">
            <label>Phân Loại Màu:</label>
            <div className="choices">
              {product.options.colors.map((color, index) => (
                <button
                  key={index}
                  className={`choice color ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="option">
            <label>Phân Loại Size:</label>
            <div className="choices">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  className={`choice size ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="quantity">
          <label>Số Lượng:</label>
          <div className="quantity-control">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="add-cart" onClick={handleAddToCart}>Thêm Vào Giỏ Hàng</button>
          <button className="buy-now" onClick={handleBuyNow}>Mua Ngay</button>
        </div>
      </div>

      {modalOpen && (
        <div
          className="modal-product-detail-container fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal-product-detail-content rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-header relative p-6 pb-0">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold">Thông Tin Người Mua</h2>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitOrder} className="modal-body p-6 space-y-4">
              <div className="card-input-group">
                <label className="cart-label block text-sm font-medium mb-1">
                  Họ và Tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="cart-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={buyerInfo.name}
                  placeholder="Nhập họ và tên"
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                />
              </div>

              <div>
                <label className="cart-label block text-sm font-medium mb-1">
                  Địa Chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="cart-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={buyerInfo.address}
                  placeholder="Nhập địa chỉ"
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, address: e.target.value })}
                />
              </div>

              <div>
                <label className="cart-label block text-sm font-medium mb-1">
                  Số Điện Thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  pattern="0[0-9]{9}"
                  required
                  className="cart-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={buyerInfo.phone}
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
                />
                <p className="mt-1 text-xs text-gray-500">Vui lòng nhập số điện thoại hợp lệ (ví dụ: 0912345678)</p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Hoàn Thành Đặt Hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;