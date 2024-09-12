import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getHistoryOrder,
  getHistoryOrderIsLoading,
  getHIstoryOrderApi
} from '../../services/slices/UserHistoryOrder';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getHistoryOrder);
  const isLoading = useSelector(getHistoryOrderIsLoading);

  useEffect(() => {
    dispatch(getHIstoryOrderApi());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
