import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer2'
import Home from '../pages/Home';
import Travel from '../pages/Travel';
import Products from '../pages/Products';
import News from '../pages/News';
import About from '../pages/About';
import Message from '../components/Message';
import OAuthSuccess from '../pages/OAuthSuccess';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import i18n from '../i18n';

function BodyClassManager() {
  const location = useLocation();
  const [lang, setLang] = useState(i18n.language || 'en');

  useEffect(() => {
    const handleLangChange = (lng) => {
      setLang(lng);
    };

    i18n.on('languageChanged', handleLangChange);

    return () => {
      i18n.off('languageChanged', handleLangChange);
    };
  }, []);

  useEffect(() => {
    const page = location.pathname === '/' ? 'home' : location.pathname.slice(1).replace(/\//g, '-');
    const pageClass = `page-${page}`;

    // Xoá tất cả class bắt đầu bằng page- và lang-
    const classesToRemove = Array.from(document.body.classList).filter(cls =>
      cls.startsWith('page-') || cls.startsWith('lang-')
    );
    document.body.classList.remove(...classesToRemove);
    document.body.classList.add(pageClass, `lang-${lang}`);
  }, [location, lang]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/register', '/profile', '/message', '/about'];
  const isHome = location.pathname === "/";

  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage") || "en";
    document.body.classList.remove("lang-en", "lang-vi");
    document.body.classList.add(`lang-${savedLang}`);
  }, []);

  return (
    <>
      <BodyClassManager />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      {!isHome && (
        <div className="page-container" style={{ paddingTop: "70px" }}>
          <div className="content-wrap">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/products" element={<Products />} />
              <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
              <Route path="/message" element={<Message />} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      )}

      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;