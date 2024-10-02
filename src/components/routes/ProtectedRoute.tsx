import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../../components/ui/preloader/preloader';
import {
  selectUser,
  selectIsAuthChecked
} from '../../services/slices/UserSlices';

type TProtectedRouteProps = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
};

export const PrivateRoute = ({
  children,
  onlyUnAuth
}: TProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    return <Navigate to='/' state={{ from: location }} />;
  }
  return children;
};
