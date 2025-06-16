import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const name = searchParams.get('name');
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    const avatar = searchParams.get('avatar');
    const provider = searchParams.get('provider');

    const user = { name, id, email, avatar, provider };

    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);

    navigate('/');
  }, [navigate, searchParams, setUser]);

  return <div>Đang đăng nhập...</div>;
};

export default OAuthSuccess;