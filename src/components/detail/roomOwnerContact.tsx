/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import Recommend from "../chat/recommend";
import { useEffect, useState, useContext } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";
import { useNavigate } from "react-router-dom";

const recommendMessage = [
  "Cho tôi dăng ký xem phòng.",
  "Tôi có một vài câu hỏi.",
];

interface IOwner {
  id: string;
  username: string;
  avatar?: string;
  phoneNumber?: string;
  role?: number;
}

export default function RoomOwnerContact({
  owner,
}: Readonly<{ owner: IOwner }>) {
  const { username, phoneNumber } = owner;
  const [ownerReal, setOwnerReal] = useState<any>(null);
  const { currentUser }: any = useContext(AuthContext);
  const { dispatch }: any = useContext(ChatContext);
  const navigate = useNavigate();

  const handleGoChat = async () => {
    if (ownerReal && currentUser) {
      localStorage.setItem("targetUser", JSON.stringify(ownerReal));
      dispatch({ type: "CHANGE_USER", payload: ownerReal });
      const combinedId =
        currentUser.uid > ownerReal.uid
          ? currentUser.uid + ownerReal.uid
          : ownerReal.uid + currentUser.uid;
      try {
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
          // Tạo một cuộc trò chuyện mới trong bộ sưu tập chats
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          // Kiểm tra và tạo tài liệu userChats nếu chưa tồn tại
          const currentUserChatsRef = doc(db, "userChats", currentUser.uid);
          const currentUserChatsDoc = await getDoc(currentUserChatsRef);
          if (!currentUserChatsDoc.exists()) {
            await setDoc(currentUserChatsRef, {});
          }

          const ownerRealChatsRef = doc(db, "userChats", ownerReal.uid);
          const ownerRealChatsDoc = await getDoc(ownerRealChatsRef);
          if (!ownerRealChatsDoc.exists()) {
            await setDoc(ownerRealChatsRef, {});
          }

          // Cập nhật userChats
          await updateDoc(currentUserChatsRef, {
            [`${combinedId}.userInfo`]: {
              uid: ownerReal.uid,
              displayName: ownerReal.displayName,
              photoURL: ownerReal.photoURL,
            },
            [`${combinedId}.date`]: serverTimestamp(),
          });

          await updateDoc(ownerRealChatsRef, {
            [`${combinedId}.userInfo`]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [`${combinedId}.date`]: serverTimestamp(),
          });
        }

        navigate("/chat");
      } catch (err) {
        console.error("Error creating chat: ", err);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const getOwner = async () => {
      const q = query(collection(db, "users"), where("email", "==", username));

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setOwnerReal(doc.data());
          });
        } else {
          console.warn("Owner not found");
        }
      } catch (err) {
        console.error("Error fetching owner: ", err);
      }
    };
    if (username) getOwner();
  }, [username]);

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderRadius: 4,
          position: "sticky",
          top: 30,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom: 2,
          }}
        >
          <Avatar
            alt={username}
            src={ownerReal?.photoURL}
            sx={{ width: 56, height: 56 }}
          />
          <Box marginLeft={2}>
            <Typography variant="h6" color="black">
              {username}
            </Typography>
            <Typography variant="h6" color="gray">
              {phoneNumber}
            </Typography>
          </Box>
        </Box>
        <Divider light />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
          }}
          marginTop={2}
        >
          {recommendMessage.map((message, index) => {
            return (
              <Recommend message={message} key={index} owner={ownerReal} />
            );
          })}
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={2}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ borderRadius: 2, margin: 1 }}
            onClick={handleGoChat}
          >
            Chat với người bán
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
