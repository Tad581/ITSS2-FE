/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/authContext';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<any>(null);
  const [err, setErr] = useState(false);

  const { currentUser }: any = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: any) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername('');
  };
  return (
    <Box>
      <Box sx={{ padding: '10px', height: '50px', display: 'flex', alignItems: 'center' }}>
        <TextField
          type='text'
          placeholder='Nhập để tìm kiếm'
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          size='small'
          sx={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#000',
            outline: 'none',
            width: '100%',
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon
                  sx={{ cursor: 'pointer', color: '#000' }}
                  onClick={() => handleSearch()}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {err && <Box component='span'>Không tìm thấy người dùng!</Box>}
      {user && (
        <Box
          onClick={handleSelect}
          sx={{
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#000',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'pink',
            },
          }}
        >
          <Box
            component='img'
            sx={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            src={user.photoURL}
            alt=''
          />
          <Box>
            <Box
              component='span'
              sx={{
                fontSize: '18px',
                fontWeight: 700,
              }}
            >
              {user.displayName}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Search;
