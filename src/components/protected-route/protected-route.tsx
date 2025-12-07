import { FC, ReactElement } from 'react';
import { Navigate, useLocation, Location } from 'react-router-dom';

import { Preloader } from '@ui';
import { useSelector } from '@services/store';

export const ProtectedRoute: FC<{
  onlyUnAuth?: boolean;
  children: ReactElement;
}> = ({ onlyUnAuth = false, children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.data);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = (location.state as { from?: Location }) || {};
    return <Navigate to={from?.pathname || '/'} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
