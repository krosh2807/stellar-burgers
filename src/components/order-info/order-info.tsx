import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { fetchOrderById } from '../../services/ordersSlice';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

export const OrderInfo: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderData: TOrder | undefined = useSelector(
    (state) =>
      state.orders.feedOrders.find(
        (o: TOrder) => o._id === id || String(o.number) === id
      ) ||
      state.orders.userOrders.find(
        (o: TOrder) => o._id === id || String(o.number) === id
      ) ||
      (state.orders.currentOrder &&
      (state.orders.currentOrder._id === id ||
        String(state.orders.currentOrder.number) === id)
        ? state.orders.currentOrder
        : undefined)
  );
  const isLoading = useSelector((state) => state.orders.isLoading);
  const error = useSelector((state) => state.orders.error);
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.items
  );
  const isLoadingIngredients = useSelector(
    (state) => state.ingredients.loading
  );

  useEffect(() => {
    if (!ingredients.length && !isLoadingIngredients) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, isLoadingIngredients]);

  useEffect(() => {
    if (!orderData && id) {
      console.log('Fetching order with ID:', id);
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

  if (isLoading || isLoadingIngredients || !ingredients.length)
    return <Preloader />;
  if (error) return <div>Ошибка: {error}</div>;
  if (!orderInfo) return <div> Ошибка</div>;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
