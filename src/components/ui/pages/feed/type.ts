import { TOrder } from '@utils-types';

export type FeedUIProps = {
  orders: TOrder[];
  handleGetFeeds: () => void;
  handleOrderClick: (orderId: string) => void;
  total: number;
  totalToday: number;
};
