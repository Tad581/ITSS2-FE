import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { Box, OutlinedInput, Button } from '@mui/material';

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formSubmit, setFormSubmit] = useState<{
    email: string;
    password: string;
    displayName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file: any;
  }>({
    email: '',
    password: '',
    displayName: '',
    file: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async () => {
    const { displayName, email, password, file } = formSubmit;
    setLoading(true);
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
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
          BKHome Chat
        </Box>
        <Box
          component='span'
          sx={{
            color: '#5d5b8d',
            fontSize: '12px',
          }}
        >
          Register
        </Box>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <OutlinedInput
            required
            type='text'
            placeholder='display name'
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
              setFormSubmit({ ...formSubmit, displayName: e.target.value })
            }
          />
          <OutlinedInput
            required
            type='text'
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
            required
            type='text'
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
          <OutlinedInput
            required
            sx={{ display: 'none' }}
            type='file'
            id='file'
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) =>
              setFormSubmit({ ...formSubmit, file: e.target.files[0] })
            }
          />
          <Box
            component='label'
            htmlFor='file'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#8da4f1',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <Box
              component='img'
              src='/addAvatar.png'
              alt=''
              sx={{ width: '32px' }}
            />
            <Box component='span'>Add an avatar</Box>
          </Box>
          <Button
            disabled={loading}
            style={{
              backgroundColor: '#7b96ec',
              color: 'white',
              padding: '10px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleSubmit}
          >
            Sign up
          </Button>
          {loading && 'Uploading and compressing the image please wait...'}
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
          You do have an account? <Link to='/register'>Login</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
