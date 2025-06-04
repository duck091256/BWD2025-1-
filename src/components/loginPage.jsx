import React, { useEffect, useState } from 'react'
import '../styles/login.scss';
import { useTranslation } from 'react-i18next';

function LoginPage() {

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            window.location.href = '/';
        }
    }, []);

    const { t } = useTranslation();

    useEffect(() => {
        import('../scripts/login.js');
    }, []);

    // usetState cho phần Registration
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [ReSuccessMessage, setReSucessMessage] = useState("");
    const [ReErrorMessage, setReErrorMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault(); // chặn reload trang khi submit

        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData) // { username, email, password }
            });

            setReSucessMessage("");

            if (!res.ok) {
                const errorData = await res.json();
                setReErrorMessage(errorData.message);
                throw new Error(errorData.message || 'Registration failed. Please try again!');
            }

            const data = await res.json();
            setReErrorMessage("");
            setReSucessMessage(data.message); // ví dụ: "Đăng ký thành công!"

            // 👇 Có thể làm thêm:
            // - chuyển sang trang login
            // - clear form
            // - lưu thông tin vào localStorage nếu cần

        } catch (err) {
            setReErrorMessage(err.message || 'Backend connection failed or unknown error.!');
            console.error(err);
        }
    };

    // useState cho phần Login
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [successMessage, setSucessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const data = await res.json();
            setSucessMessage("");

            if (!res.ok) {
                setIsLoading(false);
                if (data.message?.includes("NO EXISTING THAT ACCOUNT")) {
                    setErrorMessage(t('loginPage.errorMessage0'));
                } else if (data.message?.includes("WRONG PASSWORD")) {
                    const newAttempts = loginAttempts + 1;
                    setLoginAttempts(newAttempts);

                    if (newAttempts >= 3) {
                        setErrorMessage(t('loginPage.errorMessage1'));
                    } else {
                        setErrorMessage(t('loginPage.errorMessage2'));
                    }
                } else {
                    setErrorMessage(data.message || t('loginPage.errorMessage3'));
                }

                return;
            }

            setErrorMessage("");
            setSucessMessage(t('loginPage.successMessage'));

            const localUser = {
                name: data.username || loginData.username,
                email: data.email || '',
                provider: 'local',
                avatar: 'https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg' // Avatar trắng mặc định
            };
            localStorage.setItem('user', JSON.stringify(localUser));

            // Đợi 1.5s rồi chuyển trang
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);

        } catch (err) {
            console.error(err);
            setErrorMessage("Backend connection failed or unknown error.");
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-register-container">
                <div className="form-box login">
                    <form onSubmit={handleLogin}>
                        <h1 className="text-3xl font-bold">{t('loginPage.rightTitle')}</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder={t('loginPage.username')}
                                required
                                value={loginData.username}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, username: e.target.value })
                                }
                            />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder={t('loginPage.password')}
                                required
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, password: e.target.value })
                                }
                            />
                            <i className='bx bxs-lock-alt' ></i>
                        </div>
                        <div className="forgot-link">
                            <a href="#" style={{ color: loginAttempts >= 3 ? 'red' : 'gray' }}>
                                {t('loginPage.forgotPassword')}
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            disabled={isLoading}
                        >
                            {isLoading ? <span className="spinner-btn" /> : t('loginPage.rightButton')}
                        </button>

                        {successMessage && (
                            <span style={{ color: 'green', fontSize: '0.9rem', marginTop: '8px', display: 'block' }}>
                                {successMessage}
                            </span>
                        )}
                        {errorMessage && (
                            <span style={{ color: 'red', fontSize: '0.9rem', marginTop: '8px', display: 'block' }}>
                                {errorMessage}
                            </span>
                        )}
                        <p>{t('loginPage.otherOption')}</p>
                        <div className="social-icons">
                            <a href="http://localhost:5000/api/auth/google"><i className='bx bxl-google' ></i></a>
                            <a href="http://localhost:5000/api/auth/facebook"><i class='bx bxl-facebook-circle' ></i></a>
                            <a href="http://localhost:5000/api/auth/github"><i className='bx bxl-github' ></i></a>
                            <a href="http://localhost:5000/api/auth/discord"><i class='bx bxl-discord-alt'></i></a>
                        </div>
                    </form>
                </div>

                <div className="form-box register">
                    <form onSubmit={handleRegister}>
                        <h1 className="text-3xl font-bold">{t('registerPage.leftTitle')}</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder={t('registerPage.username')}
                                value={registerData.username}
                                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                required
                            />
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder={t('registerPage.email')}
                                value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                required
                            />
                            <i className='bx bxs-envelope' ></i>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder={t('registerPage.password')}
                                value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                required
                            />
                            <i className='bx bxs-lock-alt' ></i>
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            disabled={isLoading}
                        >
                            {isLoading ? <span className="spinner-btn" /> : t('registerPage.leftButton')}
                        </button>
                        {ReSuccessMessage && (
                            <span style={{ color: 'green', fontSize: '0.9rem', marginTop: '8px', display: 'block' }}>
                                {ReSuccessMessage}
                            </span>
                        )}
                        {ReErrorMessage && (
                            <span style={{ color: 'red', fontSize: '0.9rem', marginTop: '8px', display: 'block' }}>
                                {ReErrorMessage}
                            </span>
                        )}
                        <p>{t('registerPage.otherOption')}</p>
                        <div className="social-icons">
                            <a href="http://localhost:5000/api/auth/google"><i className='bx bxl-google'></i></a>
                            <a href="http://localhost:5000/api/auth/facebook"><i class='bx bxl-facebook-circle' ></i></a>
                            <a href="http://localhost:5000/api/auth/github"><i className='bx bxl-github'></i></a>
                            <a href="http://localhost:5000/api/auth/discord"><i class='bx bxl-discord-alt'></i></a>
                        </div>
                    </form>
                </div>

                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1 className="text-3xl font-bold">{t('loginPage.leftTitle')}</h1>
                        <p>{t('loginPage.subLeftTitle')}</p>
                        <button className="btn register-btn">{t('loginPage.leftButton')}</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1 className="text-3xl font-bold">{t('registerPage.rightTitle')}</h1>
                        <p>{t('registerPage.subRightTitle')}</p>
                        <button className="btn login-btn">{t('registerPage.rightButton')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;