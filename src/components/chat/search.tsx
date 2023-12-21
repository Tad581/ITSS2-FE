import { useState } from 'react';
import { Box, OutlinedInput } from '@mui/material';
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState('');
  // const [user, setUser] = useState(null);
  // const [err, setErr] = useState(false);

  // const { currentUser } = useContext(AuthContext);

  // const handleSearch = async () => {
  //   const q = query(
  //     collection(db, "users"),
  //     where("displayName", "==", username)
  //   );

  //   try {
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       setUser(doc.data());
  //     });
  //   } catch (err) {
  //     setErr(true);
  //   }
  // };

  // const handleKey = (e) => {
  //   e.code === "Enter" && handleSearch();
  // };

  // const handleSelect = async () => {
  //   //check whether the group(chats in firestore) exists, if not create
  //   const combinedId =
  //     currentUser.uid > user.uid
  //       ? currentUser.uid + user.uid
  //       : user.uid + currentUser.uid;
  //   try {
  //     const res = await getDoc(doc(db, "chats", combinedId));

  //     if (!res.exists()) {
  //       //create a chat in chats collection
  //       await setDoc(doc(db, "chats", combinedId), { messages: [] });

  //       //create user chats
  //       await updateDoc(doc(db, "userChats", currentUser.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           photoURL: user.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });

  //       await updateDoc(doc(db, "userChats", user.uid), {
  //         [combinedId + ".userInfo"]: {
  //           uid: currentUser.uid,
  //           displayName: currentUser.displayName,
  //           photoURL: currentUser.photoURL,
  //         },
  //         [combinedId + ".date"]: serverTimestamp(),
  //       });
  //     }
  //   } catch (err) {}

  //   setUser(null);
  //   setUsername("")
  // };
  return (
    <Box sx={{ borderBottom: '1px solid gray' }}>
      <Box sx={{ padding: '10px' }}>
        <OutlinedInput
          type='text'
          placeholder='Find a user'
          // onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          sx={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            outline: 'none',

            '&::placeholder': {
              color: 'lightgray',
            },
          }}
        />
      </Box>
      {/* {err && <Box component='span'>User not found!</Box>} */}
      {/* {user && ( */}
      <Box
        className='userChat'
        // onClick={handleSelect}
        sx={{
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'white',
          cursor: 'pointer',

          '&:hover': {
            backgroundColor: '#2f2d52',
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
          // src={user.photoURL}
          alt=''
        />
        <Box className='userChatInfo'>
          <Box
            component='span'
            sx={{
              fontSize: '18px',
              fontWeight: 500,
            }}
          >
            {/* {user.displayName} */}
          </Box>
        </Box>
      </Box>
      {/* )} */}
    </Box>
  );
};

export default Search;
