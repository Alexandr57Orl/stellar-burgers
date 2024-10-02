import { RootState } from './store';

export const selectOrderById = (number: number) => (state: RootState) => {
  //проверка массив на длину. Если он пуст или равен 0, возвращается null
  if (state.feeddata.orders.length || state.historyorderstate.orders.length) {
    return (
      state.feeddata.orders.find((order) => order.number === number) ||
      state.historyorderstate.orders.find((order) => order.number === number) //Если не найден, селектор ищет заказ с таким же номером в state.ordershistory.orders и, если находит, возвращает его
    );
  }
  if (state.feeddata.modalOrder) {
    return state.feeddata.modalOrder.number === number
      ? state.feeddata.modalOrder
      : null;
  }
  return null; // в случае, если заказ с указанным номером не найден.
};
