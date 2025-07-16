import React, { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = ({ order, onClick }) => {
  const location = useLocation();
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.items
  );
  const isLoadingIngredients = useSelector(
    (state) => state.ingredients.loading
  );

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (isLoadingIngredients) return <Preloader />;
  if (!ingredients.length) return <div>Нет данных ингредиентов</div>;
  if (!orderInfo) return null;

  return (
    <div style={{ cursor: 'pointer' }}>
      <OrderCardUI
        orderInfo={orderInfo}
        maxIngredients={maxIngredients}
        locationState={{ background: location }}
        onClick={onClick}
      />
    </div>
  );
};
