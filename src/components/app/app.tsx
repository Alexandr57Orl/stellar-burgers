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
import { toGetUserApi, checkUserAuth } from '../../services/slices/UserSlices';
import { AppDispatch } from '../../services/store';
import { PrivatedRoute } from '../../components/routes/ProtectedRoute';

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
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='login'
          element={
            <PrivatedRoute onlyUnAuth>
              <Login />
            </PrivatedRoute>
          }
        />
        <Route
          path='register'
          element={
            <PrivatedRoute onlyUnAuth>
              <Register />
            </PrivatedRoute>
          }
        />
        <Route
          path='forgot-password'
          element={
            <PrivatedRoute onlyUnAuth>
              <ForgotPassword />
            </PrivatedRoute>
          }
        />
        <Route
          path='reset-password'
          element={
            <PrivatedRoute onlyUnAuth>
              <ResetPassword />
            </PrivatedRoute>
          }
        />
        <Route
          path='profile'
          element={
            <PrivatedRoute>
              <Profile />
            </PrivatedRoute>
          }
        />
        <Route
          path='profile/orders'
          element={
            <PrivatedRoute>
              <ProfileOrders />
            </PrivatedRoute>
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
              <PrivatedRoute>
                <Modal title='Информаци по заказу' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </PrivatedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
