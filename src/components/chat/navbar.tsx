// import { useContext } from 'react'
// import {signOut} from "firebase/auth"
// import { auth } from '../firebase'
// import { AuthContext } from '../context/AuthContext'
import { Box, Button } from '@mui/material';
const Navbar = () => {
  // const {currentUser} = useContext(AuthContext)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#2f2d52',
        height: '50px',
        padding: '10px',
        justifyContent: 'space-between',
        color: '#ddddf7',
      }}
    >
      <Box
        component='span'
        sx={{
          fontWeight: 'bold',
        }}
      >
        Lama Chat
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
        }}
      >
        <Box
          component='img'
          sx={{
            backgroundColor: '#ddddf7',
            height: '24px',
            width: '24px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
          // src={currentUser.photoURL}
          alt=''
        />
        {/* <Box component='span'>{currentUser.displayName}</Box> */}
        <Button
          sx={{
            backgroundColor: '#5d5b8d',
            color: '#ddddf7',
            fontSize: '10px',
            border: 'none',
            cursor: 'pointer',
          }}
          // onClick={() => signOut(auth)}
        >
          logout
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
