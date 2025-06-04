import React from 'react';
import '../styles/footer2.scss';
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import logo from '../assets/images/logo/vku-logo.png';

const members = [
  {
    name: 'Nguyễn Hữu Quốc Bảo',
    id: '24IT019',
    fb: 'https://www.facebook.com/quocbao.nguyenhuu.507',
    git: 'https://github.com/QuocBao1406',
    ig: 'https://www.instagram.com/baonhq'
  },
  {
    name: 'Trần Thanh Đức',
    id: '24IT341',
    fb: 'https://www.facebook.com/yuma4706',
    git: 'https://github.com/duck091256',
    ig: 'https://www.instagram.com/tth.duck'
  },
  {
    name: 'Lê Hoài Đức',
    id: '24IT339',
    fb: 'https://www.facebook.com/hoai.uc.le.2024',
    git: 'https://github.com/HOAIDUC-L',
    ig: 'https://www.instagram.com/khongthetuongtuongnoi'
  },
  {
    name: 'Lê Đăng Khoa',
    id: '24IT119',
    fb: 'https://www.facebook.com/angkhoa.215282',
    git: 'https://github.com/aykuBintoiday',
    ig: 'https://www.instagram.com/binnn_binnn_'
  },
];

const Footer2 = () => {
  return (
    <footer className="footer relative h-[300px]">
      <div className="footer-members">
        {members.map((member, index) => (
          <div className="member" key={index}>
            <p className="member-name">{member.name}</p>
            <p className="member-id">MSV: {member.id}</p>
            <div className="member-icons">
              <a href={member.fb} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href={member.git} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href={member.ig} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
        ))}
      </div>

      <div className="footer-info">
        <p>
          Copyright © 2022 - Trường Đại học Công nghệ Thông tin & Truyền Thông Việt - Hàn, Đại học Đà Nẵng
        </p>
        <p>Địa chỉ: 470 Đường Trần Đại Nghĩa, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng</p>
        <div className="logo-container">
          <a
            href="https://vku.udn.vn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logo}
              alt="VKU Logo"
              className="vku-logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;