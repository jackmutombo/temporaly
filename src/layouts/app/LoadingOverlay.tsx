import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
interface Props {
  message?: string;
}
export default function LoadingOverlay({ message = 'Loading...' }: Props) {
  return (
    <Backdrop
      open={true}
      invisible={true}
      sx={{ top:'50%' }}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        {/* TODO remove inline style */}
        <CircularProgress
          size={50}
          style={{ color: '#509E2F' }}
        />
        <Typography
          variant='h4'
          sx={{ justifyContent: 'center', position: 'fixed', top: '60%' }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
