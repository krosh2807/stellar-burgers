import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchUserOrders } from '../../services/ordersSlice';
import { fetchIngredients } from '../../services/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.orders.userOrders);
  const ingredientsLoaded = useSelector(
    (state) => state.ingredients.items.length > 0
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUserOrders());
    if (!ingredientsLoaded) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsLoaded]);

  const handleOrderClick = useCallback(
    (orderId: string) => {
      navigate(`/profile/orders/${orderId}`, {
        state: { background: location }
      });
    },
    [navigate, location]
  );

  return (
    <ProfileOrdersUI orders={orders} handleOrderClick={handleOrderClick} />
  );
};
