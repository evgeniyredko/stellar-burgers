import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@services/store';
import { useLocation } from 'react-router-dom';

export const AppHeader: FC = () => {
  const userName = useSelector((state) => state.user.data?.name);
  const { pathname } = useLocation();

  return <AppHeaderUI userName={userName} pathname={pathname} />;
};
