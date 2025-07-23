import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Register } from '../pages/register/register';
import { Login } from '../pages/login/login';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { ConstructorPage } from '../pages/constructor-page/constructor-page';
import { Feed } from '../pages/feed/feed';
import { Profile } from '../pages/profile/profile';
import { ProfileOrders } from '../pages/profile-orders/profile-orders';
import { NotFound404 } from '../pages/not-fount-404/not-fount-404';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { ModalUI } from '../components/ui/modal';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
import { OrderInfo } from '../components/order-info/order-info';

export const Router = () => {
  const location = useLocation();
  const state = location.state as { background?: Location };
  const navigate = useNavigate();

  const handleClose = () => navigate(-1);

  return (
    <>
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:id' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path='/profile/*'
          element={
            <ProtectedRoute>
              <Routes location={state?.background || location}>
                <Route path='' element={<Profile />} />
                <Route path='orders' element={<ProfileOrders />} />
                <Route path='orders/:id' element={<OrderInfo />} />
              </Routes>
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {state?.background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <ModalUI title='Детали ингредиента' onClose={handleClose}>
                <IngredientDetails />
              </ModalUI>
            }
          />
          <Route
            path='/feed/:id'
            element={
              <ModalUI title='Детали заказа' onClose={handleClose}>
                <OrderInfo />
              </ModalUI>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <ModalUI title='Детали заказа' onClose={handleClose}>
                <OrderInfo />
              </ModalUI>
            }
          />
        </Routes>
      )}
    </>
  );
};
