import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday
} from '../../services/slices/FeedSlice';
import { useSelector } from '../../services/store';

// Вспомогательная функция для получения номеров заказов по их статусу
const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status) // Фильтруем заказы по статусу
    .map((item) => item.number) // Извлекаем номера заказов
    .slice(0, 20); // Ограничиваем результат до 20 заказов

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(getFeedOrders);
  const totalToday = useSelector(getFeedTotal);
  const totalAmountToday = useSelector(getFeedTotalToday);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total: totalToday, totalToday: totalAmountToday }}
    />
  );
};
