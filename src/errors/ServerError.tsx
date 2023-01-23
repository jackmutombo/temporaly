import { Container, Divider, Paper, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ServerError() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography
            variant='h3'
            color='error'
          >
            {state?.error?.title || 'Server error'}
          </Typography>
          <Divider />
          <Typography>
            {state.error?.detail || 'Internal server error'}
          </Typography>
        </>
      ) : (
        <Typography
          variant='h3'
          color='error'
        >
          Server error
        </Typography>
      )}
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </Container>
  );
}
