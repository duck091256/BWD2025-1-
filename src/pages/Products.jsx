import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/products.scss'; // Thêm CSS cho trang sản phẩm
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const PRODUCTS = [
  {
    id: 1,
    name: 'Kính thời trang',
    price: 45900,
    colors: ['Đen', 'Xám', 'Nâu'],
    image: require('../assets/images/products/product1.png')
  },
  {
    id: 2,
    name: 'Bình nước inox',
    price: 150000,
    colors: ['Navy', 'Đen', 'Đỏ'],
    image: require('../assets/images/products/product2.png')
  },
  {
    id: 3,
    name: 'Giỏ dã ngoại',
    price: 250000,
    colors: ['Hồng', 'Vàng', 'Xanh lá'],
    image: require('../assets/images/products/product3.png')
  },
  {
    id: 4,
    name: 'Kem chống nắng',
    price: 120000,
    colors: ['Xanh lá', 'Hồng', 'Xanh'],
    image: require('../assets/images/products/product4.png')
  },
  {
    id: 5,
    name: 'Khăn tắm sợi tre',
    price: 80000,
    colors: ['Xanh', 'Cam', 'Hồng'],
    image: require('../assets/images/products/product5.png')
  },
  {
    id: 6,
    name: 'Túi đan thủ công',
    price: 100000,
    colors: ['Đỏ', 'Be', 'Kaki'],
    image: require('../assets/images/products/product6.png')
  },
  {
    id: 7,
    name: 'Thảm picnic',
    price: 200000,
    colors: ['Vàng', 'Hồng', 'Xanh'],
    image: require('../assets/images/products/product7.png')
  },
  {
    id: 8,
    name: 'Đèn pin năng lượng mặt trời',
    price: 250000,
    colors: ['Xanh lá', 'Đen', 'Vàng'],
    image: require('../assets/images/products/product8.png')
  },
  {
    id: 9,
    name: 'Balo du lịch',
    price: 500000,
    colors: ['Đen', 'Xanh', 'Xám'],
    image: require('../assets/images/products/product9.png')
  },
  {
    id: 10,
    name: 'Nón du lịch',
    price: 50000,
    colors: ['Be', 'Trắng', 'Cà phê'],
    image: require('../assets/images/products/product10.png')
  },
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalProduct, setModalProduct] = useState(null);
  const [formData, setFormData] = useState({ color: '', size: '', quantity: 1, name: '', address: '', phone: '' });

  useEffect(() => {
    emailjs.init('ucpvNgWaQb5t7FmhM');
  }, []);

  const handleBuyNow = (product) => {
    setModalProduct(product);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { color, size, quantity, name, address, phone } = formData;
    if (!color || !size || quantity < 1) {
      alert('Vui lòng chọn đầy đủ thông tin sản phẩm!');
      return;
    }

    emailjs
      .send('dulichxanhastral', 'template_j7ah4od', {
        product_name: modalProduct.name,
        product_price: modalProduct.price.toLocaleString('vi-VN') + ' VND',
        product_size: size,
        product_color: color,
        quantity_input: quantity,
        buyer_name: name,
        buyer_phone: phone,
        buyer_address: address,
      })
      .then(() => {
        alert('Đặt hàng thành công! Email đã được gửi đến người bán.');
        setModalProduct(null);
        setFormData({ color: '', size: '', quantity: 1, name: '', address: '', phone: '' });
      })
      .catch((error) => {
        console.error('Lỗi khi gửi email:', error);
        alert('Có lỗi xảy ra khi gửi email. Vui lòng thử lại.');
      });
  };

  const filteredProducts = PRODUCTS.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="products-page">
      <video autoPlay muted loop id="background-video">
        <source src="/img/0513.mp4" type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>

      <div className="search-bar">
        <input
          type="text"
          id="search-input"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="item">
            <div className="image-box">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="details">
              <h2>{product.name}</h2>
              <div className="buttons">
                <Link to={`/product-detail/${product.id}`} className="btn btn-info">Tìm Hiểu</Link>
                <button className="btn btn-buy" onClick={() => handleBuyNow(product)}>Mua Ngay</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalProduct && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setModalProduct(null)}>
          <div className="modal-content bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <span className="close-button absolute top-4 right-4 text-2xl cursor-pointer hover:text-gray-600" onClick={() => setModalProduct(null)}>
              &times;
            </span>

            <h2 className="text-xl font-bold mb-4">Mua Ngay</h2>
            <p id="current-price" className="text-lg font-semibold mb-6">Giá: {modalProduct.price.toLocaleString('vi-VN')} VND</p>

            <form onSubmit={handleFormSubmit} className="buy-now-form space-y-4">
              <div className="cart-input-group">
                <label className="block mb-2 font-medium">Chọn Màu:</label>
                <select
                  className="cart-input w-full p-2 border rounded"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  required
                >
                  <option value="">Chọn màu</option>
                  {modalProduct.colors.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="cart-input-group">
                <label className="block mb-2 font-medium">Chọn Size:</label>
                <select
                  className="cart-input w-full p-2 border rounded"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  required
                >
                  <option value="">Chọn size</option>
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div className="cart-input-group">
                <label className="block mb-2 font-medium">Số lượng:</label>
                <input
                  className="cart-input w-full p-2 border rounded"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>

              <div className="cart-input-group">
                <label className="cart-label block mb-2 font-medium">Họ và Tên:</label>
                <input
                  className="cart-input w-full p-2 border rounded"
                  type="text"
                  value={formData.name}
                  placeholder="Nhập họ và tên"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="cart-input-group">
                <label className="cart-label block mb-2 font-medium">Địa Chỉ:</label>
                <input
                  className="cart-input w-full p-2 border rounded"
                  type="text"
                  value={formData.address}
                  placeholder="Nhập địa chỉ"
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="cart-input-group">
                <label className="cart-label block mb-2 font-medium">Số Điện Thoại:</label>
                <input
                  className="cart-input w-full p-2 border rounded"
                  type="tel"
                  pattern="0[0-9]{9}"
                  value={formData.phone}
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 rounded font-medium transition-colors"
              >
                Mua
              </button>
            </form>
          </div>
        </div>
      )}

      <Link to="/cart" className="cart-button">
        <FaShoppingCart />
      </Link>
    </div>
  );
};

export default Products;