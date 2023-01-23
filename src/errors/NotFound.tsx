import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container
      component={Paper}
      sx={{ height: 400 }}
    >
      <Typography
        gutterBottom
        variant='h3'
      >
        Oop we could not found what you are looking for
      </Typography>
      <Divider />
      {/* TODO use text constant */}{' '}
      {/* TODO check if the user is login before returning to farm */}
      <Button onClick={() => navigate('/farm')}>Go back</Button>
    </Container>
  );
}
