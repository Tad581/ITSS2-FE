import React, { useState, useContext } from "react";
import { Box, Link, IconButton, Menu, MenuItem, Button } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import { AuthContext } from "../context/authContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
interface IProps {
  handleKeyword?: (keyword: string) => void;
  displayButton?: boolean;
  onButtonClick?: () => void;
}

export default function AdminHeader() {
  const { currentUser }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("targetUser");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        width: "100%",
        borderBottom: 1,
        borderColor: "gray",
        padding: "10px 20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          marginX: "auto",
        }}
      >
        <Button component={Link} href="/admin/users">
          Danh sách người dùng
        </Button>
        <Button component={Link} href="/admin/rooms">
          Danh sách phòng
        </Button>
        {currentUser?.uid ? (
          <Button onClick={handleSignOut}>
            <LogoutIcon sx={{ marginRight: 1 }} />
            Đăng xuất
          </Button>
        ) : (
          <Button component={Link} href="/login">
            <LoginIcon sx={{ marginRight: 1 }} />
            Đăng nhập
          </Button>
        )}
      </Box>
    </Box>
  );
}
