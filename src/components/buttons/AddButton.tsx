import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export interface IAddButtonProps {
  children?: any;
  onClick?: any;
}

export function AddButton(props: IAddButtonProps) {
  return (
    <>
      <IconButton onClick={props.onClick}>
        <AddCircleIcon htmlColor='#fff' />
      </IconButton>
    </>
  );
}
