import { TOrder } from '@utils-types';

export type OrdersListUIProps = {
  orderByDate: TOrder[];
  handleOrderClick: (orderId: string) => void;
};
