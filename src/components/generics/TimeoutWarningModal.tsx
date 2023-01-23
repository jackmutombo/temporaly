import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useAppDispatch } from '../../store/configureStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import textConstants from '../../util/textConstants';
import { signOutUser } from '../../features/user/userSlice';

interface props {
  isOpen: boolean;
  onRequestClose: any;
}
export const TimeoutWarningModal = ({ isOpen, onRequestClose }: props) => {
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [counterDone, setCounterDone] = useState(false);
  const [open, setOpen] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { routes } = textConstants;

  const onLogOffCall = () => {
    // Implement your logout functionality here
    navigate(routes.home);
    setOpen(false);
    dispatch(signOutUser());
  };

  useEffect(() => {
    if (counterDone) {
      navigate(routes.home);
      dispatch(signOutUser());
    }
  }, [counterDone, navigate, dispatch, routes]);

  useEffect(() => {
    if (isOpen) {
      const intervalId = setInterval(() => {
        setSecondsRemaining(secondsRemaining - 1);
        if (secondsRemaining === 0) {
          setCounterDone(true);
          setOpen(false);
        }
      }, 1000);
      return () => {
        clearInterval(intervalId);
        setCounterDone(false);
      };
    }
  }, [isOpen, secondsRemaining]);

  return (
    <div>
      {isOpen && open && (
        <Dialog
          open={isOpen}
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
              onClick={onRequestClose}
              variant='contained'
              color={secondsRemaining > 10 ? 'success' : 'warning'}
            >
              {`Stay Logged In ${secondsRemaining}`}
            </Button>
            <Button
              onClick={onLogOffCall}
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
};

