import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/configureStore';
import { toast } from 'react-toastify';

interface Props {
  children: JSX.Element;
  roles?: string[];
}

export default function PrivateRoute({ children, roles }: Props) {
  const {user} = useAppSelector(state => state.user);
  const location = useLocation();
  if (!user) {
    return (
      <Navigate
        to='/'
        state={{ from: location }}
        replace
      />
    );
  } else {
    if (roles && !roles?.some(r => user?.roles.includes(r))) {
      toast.error('Not authorized to access this area');
      return (
        <Navigate
          to='/farm'
          replace
        />
      );
    }
    return children;
  }
}
