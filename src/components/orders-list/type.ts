import { TOrder } from '@utils-types';

export type OrdersListProps = {
  orders: TOrder[];
  handleOrderClick: (orderId: string) => void;
};
