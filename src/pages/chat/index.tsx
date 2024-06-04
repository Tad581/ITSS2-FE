/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../layout/header";
import { Box, Divider } from "@mui/material";
import Chat from "../../components/chat/chat";
import Sidebar from "../../components/chat/sidebar";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../context/chatContext";

export default function ChatPage() {
  const { dispatch }: any = useContext(ChatContext);

  useEffect(() => {
    if (!localStorage.getItem("targetUser")) return;
    const targetUser = localStorage.getItem("targetUser");
    dispatch({
      type: "CHANGE_USER",
      payload: targetUser ? JSON.parse(targetUser) : null,
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#EEEDEB",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Header />
      <Box
        sx={{
          marginTop: 3,
          border: "1px solid white",
          borderRadius: "10px",
          width: "90%",
          height: "80%",
          display: "flex",
          overflow: "hidden",
          fontFamily: "Raleway, Arial",
        }}
      >
        <Sidebar />
        <Divider orientation="vertical" />
        <Chat />
      </Box>
    </Box>
  );
}
