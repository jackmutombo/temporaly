import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#4DA02B',
      dark: '#4DA02B',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4B4F54',
    },
  },
});

export interface ILoadingButtonProps {
  onClick?: any;
  loading: boolean;
  children: string;
  type: 'submit';
  contained?: 'contained';
  extraStyle?: string;
  disabled?: boolean;
  primary?: boolean;
  secondary?: boolean;
}

export function CustomLoadingButton(props: ILoadingButtonProps) {
  return (
    <ThemeProvider theme={theme}>
      <LoadingButton
        size='small'
        color={props.secondary ? 'secondary' : 'primary'}
        onClick={props.onClick}
        loading={props.loading}
        type={props.type}
        disabled={props.disabled}
        variant={props.contained}
        fullWidth={true}
        className={props.extraStyle}
        // sx={{ mt: 3, mb: 2 }}
      >
        {props.children}
      </LoadingButton>
    </ThemeProvider>
  );
}
