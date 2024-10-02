import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import '../../index.css';
import styles from './app.module.css';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/IngredientsSlice';
import { checkUserAuth } from '../../services/slices/UserSlices';
import { PrivateRoute } from '../../components/routes/ProtectedRoute';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const locationState = location.state as { background?: Location };
  const background = locationState && location.state?.background;

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        {/* роуты которые находятся под защитой */}
        <Route
          path='login'
          element={
            <PrivateRoute onlyUnAuth>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path='register'
          element={
            <PrivateRoute onlyUnAuth>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path='forgot-password'
          element={
            <PrivateRoute onlyUnAuth>
              <ForgotPassword />
            </PrivateRoute>
          }
        />
        <Route
          path='reset-password'
          element={
            <PrivateRoute onlyUnAuth>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path='profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='profile/orders'
          element={
            <PrivateRoute>
              <ProfileOrders />
            </PrivateRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Заказ' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <PrivateRoute>
                <Modal title='Информаци по заказу' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
