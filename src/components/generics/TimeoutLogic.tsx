import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../features/user/userSlice';
import { useAppDispatch } from '../../store/configureStore';
import {
  addEventListeners,
  logInfo,
  minute,
  removeEventListeners,
} from '../../util/general';
import textConstants from '../../util/textConstants';
import { TimeoutWarningModal } from './TimeoutWarningModal';

export const TimeoutLogic = () => {
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { routes } = textConstants;

  // use the useMemo hook to memoize the refreshTime and activeTime values, so they are not recalculated on every render
  const activeTime = useMemo(() => {
    return minute * Number(process.env.REACT_APP_ACTIVE_TIME_MINUTE);
  }, []);

  useEffect(() => {
    const createTimeout1 = () =>
      setTimeout(() => {
        setWarningModalOpen(true);
      }, activeTime - minute);

    const createTimeout2 = () =>
      setTimeout(() => {
        // Implement a sign out function here
        navigate(routes.home);
        dispatch(signOutUser());
        //   window.location.href = 'http://localhost:3000'
        setWarningModalOpen(false);
        logInfo('sign out');
      }, activeTime);

    const listener = () => {
      if (!isWarningModalOpen) {
        clearTimeout(timeout);
        timeout = createTimeout1();
      }
    };

    // Initialization
    let timeout = isWarningModalOpen ? createTimeout2() : createTimeout1();
    addEventListeners(listener);

    // Cleanup
    return () => {
      removeEventListeners(listener);
      clearTimeout(timeout);
    };
  }, [isWarningModalOpen, activeTime, dispatch, navigate, routes]);
  return (
    <div>
      {isWarningModalOpen && (
        <TimeoutWarningModal
          isOpen={isWarningModalOpen}
          onRequestClose={() => setWarningModalOpen(false)}
        />
      )}
    </div>
  );
};
