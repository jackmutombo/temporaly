import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { Theme } from '../../util/Theme';

export interface ISimpleButtonProps {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment;
  extraStyle?: string;
  onClick?: any;
  variant: 'outlined';
}

export function BorderButton(props: ISimpleButtonProps) {
  return (
    <ThemeProvider theme={Theme}>
      <Button
        size='small'
        color='secondary'
        fullWidth={true}
        variant={props.variant}
        onClick={props.onClick}
        className={props.extraStyle}
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
}
