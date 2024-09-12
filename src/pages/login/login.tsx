import { useDispatch } from '../../services/store';
import { TLoginData } from '../../utils/burger-api';
import { toLogin, selectIsAunticated } from '../../services/slices/UserSlices';
import { useSelector } from '../../services/store';
import { Navigate } from 'react-router-dom';
import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAunticated = useSelector(selectIsAunticated);

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userLoginDate: TLoginData = {
      email,
      password
    };

    dispatch(toLogin(userLoginDate));
  };

  if (isAunticated) {
    return <Navigate to={'/'} />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
