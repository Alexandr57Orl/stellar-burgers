import { useDispatch } from '../../services/store';
import { TLoginData } from '../../utils/burger-api';
import { toLogin } from '../../services/slices/UserSlices';
import { FC, FormEvent, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent<Element, Event>) => {
    const formEvent = e as FormEvent<HTMLFormElement>;
    formEvent.preventDefault();
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
