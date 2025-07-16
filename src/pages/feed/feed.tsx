import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeedOrders } from '../../services/ordersSlice';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.feedOrders);
  const isLoadingOrders = useSelector((state) => state.orders.isLoading);
  const ingredients = useSelector((state) => state.ingredients.items);
  const isLoadingIngredients = useSelector(
    (state) => state.ingredients.loading
  );
  const total = useSelector((state) => state.orders.total);
  const totalToday = useSelector((state) => state.orders.totalToday);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!ingredients.length) dispatch(fetchIngredients());
    dispatch(fetchFeedOrders());
  }, [dispatch]);

  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeedOrders());
  }, [dispatch]);

  const handleOrderClick = useCallback(
    (orderId: string) => {
      navigate(`/feed/${orderId}`, { state: { background: location } });
    },
    [navigate, location]
  );

  if (isLoadingOrders || isLoadingIngredients || !ingredients.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={handleGetFeeds}
      handleOrderClick={handleOrderClick}
      total={total}
      totalToday={totalToday}
    />
  );
};
