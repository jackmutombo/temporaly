import { Route, Routes } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import ForgotPasswordPage from '../../features/user/ForgotPasswordPage';
import LoginPage from '../../features/user/LoginPage';
import ResetLinkSentPage from '../../features/user/ResetLinkSentPage';
import RegisterPage from '../../features/user/RegisterPage';
import ResetPasswordPage from '../../features/user/ResetPasswordPage';
import './App.css';
import { FarmPage } from '../../features/farm/FarmPage';
import { FarmOverviewPage } from '../../features/farm/FarmOverviewPage';
import { BlockOverviewPage } from '../../features/block/BlockOverviewPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import textConstants from '../../util/textConstants';
import ServerError from '../../errors/ServerError';
import NotFound from '../../errors/NotFound';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import PrivateRoute from './PrivateRoute';
import { fetchCurrentUser } from '../../features/user/userSlice';
import { logDebug } from '../../util/general';
import LoadingOverlay from './LoadingOverlay';
import { useRefresh } from '../../hooks/useRefresh';
import { TimeoutLogic } from '../../components/generics/TimeoutLogic';
import UserPage from '../../features/user/UserPage';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  // to prevent the component to re-render all the time
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      logDebug(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  useRefresh();
  const {
    genericsText: { toastNoty },
    routes,
  } = textConstants;

  if (loading) return <LoadingOverlay message='Initializing app...' />;
  return (
    <>
      {user && <TimeoutLogic />}
      <ToastContainer
        position='bottom-right'
        autoClose={toastNoty.successTime}
        // hideProgressBar
      />
      <Routes>
        <Route
          path={routes.home}
          element={<LoginPage />}
        />
        <Route
          path={routes.farm}
          element={
             <PrivateRoute>
              <FarmPage />
             </PrivateRoute>
          }
        />
        <Route
          path={`${routes.farm}/:id`}
          element={
            <PrivateRoute roles={['Admin', 'Member']}>
              <FarmOverviewPage />
            </PrivateRoute>
          }
        />

        <Route
          path={`${routes.block}/:id`}
          element={<BlockOverviewPage />}
        />

        <Route
          path={routes.register}
          element={<RegisterPage />}
        />
        <Route
          path={routes.resetPassword}
          element={<ResetPasswordPage />}
        />
        <Route
          path={routes.resetLinkSent}
          element={<ResetLinkSentPage />}
        />
        <Route
          path={routes.forgotPassword}
          element={<ForgotPasswordPage />}
        />

       <Route
          path={routes.userAdmin}
          element={<UserPage />}
        />

        <Route
          path={routes.serverError}
          element={<ServerError />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default App;
