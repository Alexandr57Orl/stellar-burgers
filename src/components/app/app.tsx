import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal } from '@components';
import { PrivatedRoute } from '../routes/ProtectedRoute';
import { toGetUserApi } from '../../services/slices/UserSlices';

// импорты хуков
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/slices/IngredientsSlice';
import { useEffect } from 'react';
import { AppDispatch } from 'src/services/store';
// импорты роутинга по page
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

// импорты модалок
import { OrderInfo, IngredientDetails } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const App = () => {
  const location = useLocation(); // Инициализируем хук для получения текущего местоположения
  const backgroundLocal = location.state && location.state.background; // Инициализируем хук для получения состояния
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(toGetUserApi());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocal || location}>
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
            <PrivatedRoute>
              <ResetPassword />
            </PrivatedRoute>
          }
        />{' '}
        <Route
          path='profile'
          element={
            <PrivatedRoute onlyUnAuth>
              <Profile />
            </PrivatedRoute>
          }
        />
        <Route
          path='orders'
          element={
            <PrivatedRoute>
              <ProfileOrders />
            </PrivatedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocal && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/orders/:number'
            element={
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
