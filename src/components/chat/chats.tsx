// import { doc, onSnapshot } from "firebase/firestore";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";
import { Box } from '@mui/material';

const Chats = () => {
  // const [chats, setChats] = useState([]);

  // const { currentUser } = useContext(AuthContext);
  // const { dispatch } = useContext(ChatContext);

  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       setChats(doc.data());
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);

  // const handleSelect = (u) => {
  //   dispatch({ type: "CHANGE_USER", payload: u });
  // };

  return (
    <Box>
      {/* {Object.entries(chats)?.map((chat) => ( */}
        <Box
          sx={{
            padding: ' 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'white',
            cursor: 'pointer',

            '&:hover': {
              backgroundColor: '#2f2d52',
            },
          }}
          // key={chat[0]}
          // onClick={() => handleSelect(chat[1].userInfo)}
        >
          <Box
            component='img'
            // src={chat[1].userInfo.photoURL}
            alt=''
            sx={{
              width: ' 50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />

          <Box>
            <Box component='span' sx={{ fontSize: '18px', fontWeight: 500 }}>
              {/* {chat[1].userInfo.displayName} */}
            </Box>
            <Box component='p' sx={{ fontSize: '14px', color: 'lightgray' }}>
              {/* {chat[1].lastMessage?.text} */}
            </Box>
          </Box>
        </Box>
      {/* ))} */}
    </Box>
  );
};

export default Chats;
