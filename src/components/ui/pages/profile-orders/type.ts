import { TOrder } from '@utils-types';

export type ProfileOrdersUIProps = {
  orders: TOrder[];
  handleOrderClick: (orderId: string) => void;
};
