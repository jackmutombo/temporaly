import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      light: '#757ce8',
      main: '#4DA02B',
      dark: '#4DA02B',
      contrastText: '#fff',
    },
  },
});

export interface ISimpleButtonProps {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment;
  extraStyle?: string;
  onClick?: any;
  variant: 'contained';
}

export function SimpleButton(props: ISimpleButtonProps) {
  return (
    <ThemeProvider theme={theme}>
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
