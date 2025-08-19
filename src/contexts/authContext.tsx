import { Navigate, Outlet } from 'react-router-dom';

import Loading from '@/components/BaseComponents/Loading';
import { useAuth } from '@/hooks/use-auth';
import { ROUTE_PATH } from '@/enum/route-path';

const AuthGuard = () => {
  const { isTokenExisted, isLoading } = useAuth();
  // useEffect(() => {
  //   if (currentUserError) {
  //     clearAuthToken();
  //     clearRefreshToken();
  //   }
  // }, [currentUserError]);
  if (!isTokenExisted) return <Navigate to={`${ROUTE_PATH.SIGNIN}`} />;
  if (isLoading) return <Loading />;
  return (
    <>
      {isTokenExisted ? <Outlet /> : <Navigate to={`${ROUTE_PATH.SIGNIN}`} />}
    </>
  );
};

export default AuthGuard;
