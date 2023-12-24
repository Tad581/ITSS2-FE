import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/index';
import { Box, OutlinedInput, Button } from '@mui/material';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [formSubmit, setFormSubmit] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async () => {
    const { email, password } = formSubmit;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: '#a7bcff',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px 60px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Box
          component='span'
          sx={{
            color: '#5d5b8d',
            fontWeight: 'bold',
            fontSize: '24px',
          }}
        >
          Lama Chat
        </Box>
        <Box
          component='span'
          sx={{
            color: '#5d5b8d',
            fontSize: '12px',
          }}
        >
          Login
        </Box>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <OutlinedInput
            type='email'
            placeholder='email'
            sx={{
              border: 'none',
              width: '250px',
              borderBottom: '1px solid #a7bcff',
              '&::placeholder': {
                color: 'rgb(175, 175, 175)',
              },
            }}
            size='medium'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) =>
              setFormSubmit({ ...formSubmit, email: e.target.value })
            }
          />
          <OutlinedInput
            type='password'
            placeholder='password'
            sx={{
              border: 'none',
              width: '250px',
              borderBottom: '1px solid #a7bcff',
              '&::placeholder': {
                color: 'rgb(175, 175, 175)',
              },
            }}
            size='medium'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) =>
              setFormSubmit({ ...formSubmit, password: e.target.value })
            }
          />
          <Button
            sx={{
              backgroundColor: '#7b96ec',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
          {err && <Box component='span'>Something went wrong</Box>}
        </form>
        <Box
          component='p'
          sx={{
            color: '#5d5b8d',
            fontSize: '12px',
            marginTop: '10px',
          }}
        >
          You don't have an account? <Link to='/register'>Register</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
