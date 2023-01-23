import { IconButton, Menu, MenuItem, Fade } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { resetBlockReducer } from '../../features/block/blockSlice';
import { resetBusinessReducer } from '../../features/business/businessSlice';
import { resetFarmReducer } from '../../features/farm/farmSlice';
import { signOut, signOutUser } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import { logInfo } from '../../util/general';
import textConstants from '../../util/textConstants';

export default function SignedInMenu() {
  
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToAdmin = () => {
    navigate(routes.userAdmin);
  };

  const handlerResetReducer = async () => {
    await dispatch(signOutUser());
    logInfo('Signing out');
    dispatch(resetBusinessReducer());
    dispatch(resetFarmReducer());
    dispatch(resetBlockReducer());
    dispatch(signOut());
    logInfo('Navigate to login');
    navigate(routes.home);
  };

  const {
    images,
    routes,
    genericsText: { button },
  } = textConstants;

  return (
    <>
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'
      >
        <img
          alt='profile'
          src={images.profileCircle}
        ></img>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>{user?.email}</MenuItem>

        <MenuItem onClick={handleGoToAdmin}>{button.admin}</MenuItem>

        <MenuItem
          onClick={async () => {
            handlerResetReducer();
          }}
        >
          {button.logout}
        </MenuItem>
      </Menu>
    </>
  );
}
