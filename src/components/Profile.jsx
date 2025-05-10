import React, { useEffect, useState } from 'react';
import '../styles/profile.scss';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    provider: '',
    aboutme: '',
  });

  // Lấy dữ liệu ban đầu và thiết lập cả state & localStorage backup
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email,
        provider: userData.provider,
        aboutme: userData.aboutme || 'I am Thanhduck, a dedicated UI/UX Designer from VKU.',
      });
      localStorage.setItem('backupData', JSON.stringify(userData));
    }
  }, []);

  if (!user) return <div style={{ padding: 20 }}>Please log in to view your profile.</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDiscard = () => {
    const backup = JSON.parse(localStorage.getItem('backupData'));
    if (backup) {
      setFormData({
        name: backup.name,
        email: backup.email,
        provider: backup.provider,
        aboutme: backup.aboutme || '',
      });
    }
  };

  const handleSave = async (e) => {
  e.preventDefault();

  // Kiểm tra username
  if (!formData.name.trim()) return;

  try {
    const res = await fetch('http://localhost:5000/api/profile/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        name: formData.name,
        email: formData.email,
        provider: formData.provider,
        aboutme: formData.aboutme,
      }),
    });

    const result = await res.json();
    if (result.success) {
      alert('Đã lưu thành công!');
      localStorage.setItem('user', JSON.stringify({ ...user, ...formData }));
    } else {
      alert('Lỗi khi lưu: ' + result.message);
    }
  } catch (err) {
    console.error(err);
    alert('Lỗi kết nối server.');
  }
};


  return (
    <div>
      <div className="profile-container">
        <div className="left-panel">
          <h2>PROFILE</h2>
          <div className="avatar">
            <img
              src={user.avatar}
              alt="avatar"
              style={{ width: 100, borderRadius: '50%', marginBottom: 10 }}
            />
          </div>
          <div className="upload">Upload Picture</div>
          <div className="social">
            <a href="#" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: '#4267B2' }}>
              <i className="bx bxl-facebook-circle" style={{ fontSize: '24px', marginRight: '8px' }}></i>
              Add Facebook
            </a>
            
            <a href="#" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: '#1DA1F2' }}>
              <i className="bx bxl-twitter" style={{ fontSize: '24px', marginRight: '8px' }}></i>
              Add Twitter
            </a>

            <a href="#" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: '#E1306C' }}>
              <i className="bx bxl-instagram-alt" style={{ fontSize: '24px', marginRight: '8px' }}></i>
              Add Instagram
            </a>

            <a href="#" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: '#DB4437' }}>
              <i className="bx bxl-google-plus-circle" style={{ fontSize: '24px', marginRight: '8px' }}></i>
              Add Google+
            </a>
          </div>
        </div>

        <form className="right-panel" onSubmit={handleSave}>
          <label>Username:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Username"/>

          <label>E-mail:</label>
          <input type="email" name="email" value={formData.email} />

          <label>Provider:</label>
          <input type="text" name="provider" value={formData.provider} />

          <label>About Me:</label>
          <textarea name="aboutme" rows="4" value={formData.aboutme} onChange={handleChange} placeholder="Hãy viết điều gì đó về bạn nhé!" />

          <div className="button-container">
            <button type="button" className="discard-save-button btn" onClick={handleDiscard}>Discard Changes</button>
            <button type="submit" className="save-button btn">Save Changes</button>
          </div>
        </form>
      </div>

      <div className="sidebar-links">
        <a href="#">Profile</a>
        <a href="#">Statistics</a>
        <a href="#">Get Help</a>
        <a href="#">Settings</a>
        <a href="#">Sign Out</a>
      </div>
    </div>
  );
};

export default Profile;