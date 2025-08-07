import { Navigate, Outlet } from 'react-router-dom';

import Loading from '@/components/BaseComponents/Loading';
import { useAuth } from '@/hooks/use-auth';

const AuthGuard = () => {
  const { isTokenExisted, isLoading } = useAuth();
  // useEffect(() => {
  //   if (currentUserError) {
  //     clearAuthToken();
  //     clearRefreshToken();
  //   }
  // }, [currentUserError]);
  if (!isTokenExisted) return <Navigate to="/login" />;
  if (isLoading) return <Loading />;
  return <>{isTokenExisted ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default AuthGuard;
