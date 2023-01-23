import { useState, useEffect, useMemo } from 'react';
import { minute } from '../util/general';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchRefreshToken } from '../features/user/userSlice';

export function useRefresh() {
  const dispatch = useAppDispatch();
  const [lastActivity, setLastActivity] = useState(new Date());
  const { user } = useAppSelector(state => state.user);

  const unableRefresh = JSON.parse(process.env.REACT_APP_REFRESH_UNABLE ?? '');

  // use the useMemo hook to memoize the refreshTime and activeTime values, so they are not recalculated on every render
  const refreshTime = useMemo(() => {
    return minute * Number(process.env.REACT_APP_REFRESH_TIME_INTERVAL_MINUTE);
  }, []);

  const activeTime = useMemo(() => {
    return minute * Number(process.env.REACT_APP_ACTIVE_TIME_MINUTE);
  }, []);

  useEffect(() => {
    if (user && unableRefresh) {
      const refreshToken = async () => {
        // call refresh token API here
        dispatch(fetchRefreshToken());
      };
      const interval = setInterval(refreshToken, refreshTime); // 5 minutes in milliseconds
      return () => clearInterval(interval);
    }
  }, [refreshTime, user, dispatch, unableRefresh]);

  useEffect(() => {
    const onMouseMove = () => setLastActivity(new Date());
    const onClick = () => setLastActivity(new Date());

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('keyup', onClick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('keyup', onClick);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // perform logout logic here
    }, activeTime); // 15 minutes in milliseconds
    return () => clearTimeout(timeout);
  }, [lastActivity, activeTime]);
}
