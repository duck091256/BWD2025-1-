import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Cart.scss';

const formatPrice = (price) =>
  price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({ name: '', address: '', phone: '' });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    // Chuyển giá về số nếu chưa phải số (phòng trường hợp lưu chuỗi)
    const parsedCart = savedCart.map(item => ({
      ...item,
      price: typeof item.price === 'string' ? parseInt(item.price.replace(/[₫]/g, ''), 10) : item.price,
      quantity: item.quantity || 1,
    }));
    setCart(parsedCart);
    emailjs.init('ucpvNgWaQb5t7FmhM');
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleQuantityChange = (index, value) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, parseInt(value) || 1);
    updateCart(newCart);
  };

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    updateCart(newCart);
  };

  const handleBuyOne = (index) => {
    setSelectedProductIndex(index);
    setModalOpen(true);
  };

  const handleBuyAll = () => {
    if (cart.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    setSelectedProductIndex(null);
    setModalOpen(true);
  };

  const getColorCode = (name) => {
    const colors = {
      Trắng: '#fff',
      Xám: '#808080',
      Hồng: '#FFC0CB',
      Nâu: '#A52A2A',
      Xanh: '#0000FF',
      Đen: '#000000',
      Đỏ: '#FF0000',
      Vàng: '#FFD700',
      Be: '#F5F5DC',
      'Xanh lá': '#228B22',
      Kaki: '#F0E68C',
      'Cà phê': '#6F4E37',
    };
    return colors[name] || '#000';
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Tạo bản sao của giỏ hàng để tránh tham chiếu nhầm lẫn
    let productsToOrder;
    let newCart;

    if (selectedProductIndex === null) {
      // Mua tất cả sản phẩm
      productsToOrder = [...cart];  // sao chép để giữ nguyên dữ liệu
      newCart = [];  // giỏ hàng mới sẽ trống
    } else {
      // Mua một sản phẩm
      productsToOrder = [cart[selectedProductIndex]];
      newCart = cart.filter((_, idx) => idx !== selectedProductIndex);
    }

    // Tạo nội dung chi tiết sản phẩm
    const productDetails = productsToOrder.map(item =>
      `- Tên sản phẩm: ${item.name}\n` +
      `- Giá: ${item.price}\n` +
      `- Kích thước: ${item.size}\n` +
      `- Màu sắc: ${item.color}\n` +
      `- Số lượng: ${item.quantity}\n`
    ).join('\n');

    emailjs
      .send('dulichxanhastral', 'template_3nnken4', {
        buyer_name: buyerInfo.name,
        buyer_address: buyerInfo.address,
        buyer_phone: buyerInfo.phone,
        product_details: productDetails,
      })
      .then(() => {
        alert('Đặt hàng thành công!');

        // Cập nhật lại giỏ hàng sau khi gửi email thành công
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));

        setModalOpen(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi email:', error);
        alert('Lỗi khi gửi email. Vui lòng thử lại.');
      });
  };


  return (
    <div className="cart-container">
      <h1>Giỏ Hàng</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Hình Ảnh</th>
            <th>Sản Phẩm</th>
            <th>Phân Loại</th>
            <th>Đơn Giá</th>
            <th>Số Lượng</th>
            <th>Tổng</th>
            <th>Mua</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td>{item.name}</td>
              <td>
                Size: {item.size} | Màu:
                <span
                  style={{
                    backgroundColor: getColorCode(item.color),
                    width: 20,
                    height: 20,
                    display: 'inline-block',
                    borderRadius: '50%',
                    border: '1px solid #ccc',
                    marginLeft: 5,
                    verticalAlign: 'middle', // 👈 Căn giữa theo dòng chữ
                    marginBottom: 5
                  }}
                ></span>
              </td>
              <td>{formatPrice(item.price)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </td>
              <td>{formatPrice(item.price * item.quantity)}</td>
              <td>
                <button onClick={() => handleBuyOne(index)} className="buy-button">Mua</button>
              </td>
              <td>
                <button onClick={() => handleRemove(index)} className="remove-button">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <button onClick={handleBuyAll} id="checkout-all">
          Mua Tất Cả
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="modal-cart-container fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal-cart-content rounded-lg shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Thông Tin Đặt Hàng</h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-2xl"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitOrder} className="p-6">
              <div className="mb-4">
                <label className="cart-label block text-sm font-medium mb-2">
                  Họ và Tên:
                </label>
                <input
                  type="text"
                  required
                  className="cart-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={buyerInfo.name}
                  placeholder="Nhập họ và tên"
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="cart-label block text-sm font-medium mb-2">
                  Địa Chỉ:
                </label>
                <input
                  type="text"
                  required
                  className="cart-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={buyerInfo.address}
                  placeholder="Nhập địa chỉ"
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, address: e.target.value })}
                />
              </div>

              <div className="mb-6">
                <label className="cart-label block text-sm font-medium mb-2">
                  Số Điện Thoại:
                </label>
                <input
                  type="tel"
                  pattern="0[0-9]{9}"
                  required
                  className="cart-input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={buyerInfo.phone}
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Ví dụ: 0912345678</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                Đặt Hàng
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;