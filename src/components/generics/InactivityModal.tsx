import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { signOutUser } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { minute } from '../../util/general';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import textConstants from '../../util/textConstants';

function InactivityModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const dispatch = useAppDispatch();
  const { routes } = textConstants;

  // use the useMemo hook to memoize the refreshTime and activeTime values, so they are not recalculated on every render
  const activeTime = useMemo(() => {
    return minute * Number(process.env.REACT_APP_ACTIVE_TIME_MINUTE);
  }, []);

  const timeout = useRef<any>(); // initialize the timeout ref object

  // set the timeout using the timeout.current property
  timeout.current = setTimeout(() => {
    setIsModalOpen(true);
  }, activeTime - minute); // 14 minutes

  const logout = useCallback(() => {
    // Log out the user
    setIsModalOpen(false);
    navigate(routes.home);
    dispatch(signOutUser());
  }, [dispatch, navigate, routes]);

  let interval: any;
  interval = useRef();

  const startTimer = useCallback(() => {
    interval.current = setInterval(() => {
      setSecondsRemaining(seconds => {
        if (seconds === 3) {
          dispatch(signOutUser());
          clearInterval(interval.current);
        }
        if (seconds === 0) {
          setIsModalOpen(false);
          navigate(routes.home);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
  }, [interval, dispatch, navigate, routes]);

  const resetTimeout = useCallback(() => {
    clearTimeout(timeout.current);
    clearInterval(interval.current);
    setIsModalOpen(false);
    setSecondsRemaining(60);
    // add the event listeners again
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keyup', resetTimeout);

    // reset the timeout using the activeTime value
    timeout.current = setTimeout(() => {
      setIsModalOpen(true);
    }, activeTime - minute);
    timeout.current = 0;
    interval.current = 0;
  }, [timeout, interval, activeTime]);

  useEffect(() => {
    if (isModalOpen) {
      startTimer();
    }

    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keyup', resetTimeout);

    return () => {
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keyup', resetTimeout);
      clearInterval(interval.current);
    };
  }, [activeTime, logout, isModalOpen, startTimer, resetTimeout, interval]);

  const resetTimer = useCallback(() => {
    // Reset the timeout and close the modal
    resetTimeout();
    setIsModalOpen(false);
  }, [resetTimeout]);

  useEffect(() => {
    if (!isModalOpen) {
      // add the event listeners when the modal is closed
      window.addEventListener('mousemove', resetTimeout);
      window.addEventListener('keyup', resetTimeout);
    } else {
      // remove the event listeners when the modal is open
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keyup', resetTimeout);
    }
  }, [isModalOpen, resetTimeout]);

  return (
    <div>
      {user && isModalOpen && (
        <Dialog
          open={isModalOpen}
          aria-labelledby='inactivity-modal-title'
          aria-describedby='inactivity-modal-description'
        >
          <DialogTitle id='inactivity-modal-title'>
            Session Expiring
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='inactivity-modal-description'>
              You have been inactive for a while. Please choose to stay signed
              in or to logoff. Otherwise, you will be logged off automatically
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={resetTimer}
              variant='contained'
              color='success'
            >
              {`Stay Logged In (${secondsRemaining})`}
            </Button>
            <Button
              onClick={logout}
              variant='contained'
              color='error'
            >
              Log Off
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default InactivityModal;
