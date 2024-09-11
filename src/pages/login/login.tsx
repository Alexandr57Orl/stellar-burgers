import { useDispatch } from '../../services/store';
import { TLoginData } from '../../utils/burger-api';
import { toLogin } from '../../services/slices/UserSlices';
import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userLoginDate: TLoginData = {
      email,
      password
    };

    dispatch(toLogin(userLoginDate));
  };

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
