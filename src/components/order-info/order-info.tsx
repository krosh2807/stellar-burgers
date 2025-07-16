import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrderById } from '../../services/ordersSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

export const OrderInfo: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderData: TOrder | undefined = useSelector(
    (state) =>
      state.orders.feedOrders.find((o: TOrder) => o._id === id) ||
      state.orders.userOrders.find((o: TOrder) => o._id === id)
  );
  const isLoading = useSelector((state) => state.orders.isLoading);
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.items
  );

  useEffect(() => {
    if (!orderData && id) {
      dispatch(fetchOrderById(id));
    }
  }, [orderData, id, dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce<TIngredientsWithCount>(
      (acc, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !ingredients.length || !orderData) return <Preloader />;
  if (!orderInfo) return <div>Ошибка данных заказа</div>;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
