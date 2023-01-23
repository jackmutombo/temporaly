import { useState, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/configureStore';

const ITEM_HEIGHT = 40;
export interface IActionMenuProps {
  viewRoute: string;
}

export default function ActionMenu(props: IActionMenuProps) {
  const navigate = useNavigate();
  const {user} = useAppSelector(state => state.user);
  const [actionOptions, setActionOptions] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const adminOptions = ['Edit', 'View', 'Delete'];
  // const memberOptions = ['View'];

  // preserving "a" reference between re-renders
  const adminOptions = useMemo(() => (['Edit', 'View', 'Delete']), []);
  const memberOptions = useMemo(() => (['View']), []);

  useMemo(() => {
    if(user?.roles.includes('Admin')){
      setActionOptions(adminOptions);
    } else if(user?.roles.includes('Member')){
      setActionOptions(memberOptions);
    }

  }, [user?.roles, adminOptions, memberOptions]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const addMap = (event: any, value: any) => {
    if (event.target.innerText === 'View') {
      navigate(props.viewRoute);
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '15ch',
          },
        }}
      >
        {actionOptions.map(option => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={e => addMap(e, option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
