import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostAddIcon from '@mui/icons-material/PostAdd';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from "../context/authContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';

interface IProps {
  handleKeyword?: (keyword: string) => void;
}

export default function Header(props: IProps) {
  const { currentUser }: any = useContext(AuthContext);
  const [keyword, setKeyword] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('targetUser');
    navigate('/login');
    handleMenuClose();
  };

  const handleProfileClick = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/profile');
    }
    handleMenuClose();
  };

  const handleHistoryClick = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/created-rooms');
    }
    handleMenuClose();
  };

  const handlePostClick = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/created-rooms');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        width: "100%",
        borderBottom: 1,
        borderColor: "gray",
        padding: '10px 20px',
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
        <Link href="/">
          <Box
            component="img"
            sx={{
              maxHeight: 45,
              maxWidth: 100,
              marginRight: 20,
              objectFit: "cover",
              cursor: "pointer",
            }}
            alt="logo"
            src="/logo.png"
          />
        </Link>
        <Box sx={{ flexGrow: 1, marginRight: 20 }}>
          <TextField
            sx={{ width: "100%" }}
            variant="outlined"
            size="small"
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setKeyword(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      props.handleKeyword
                        ? props.handleKeyword(keyword)
                        : console.log(keyword);
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PostAddIcon />}
            onClick={handlePostClick}
            sx={{ marginRight: 2 }}
          >
            Đăng tin
          </Button>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} href="/chat">
              <ChatOutlinedIcon sx={{ marginRight: 1 }} />
              Tin nhắn
            </MenuItem>
            <MenuItem onClick={handleProfileClick}>
              <AccountCircleIcon sx={{ marginRight: 1 }} />
              Thông tin cá nhân
            </MenuItem>
            <MenuItem onClick={handleHistoryClick}>
              <HistoryIcon sx={{ marginRight: 1 }} />
              Lịch sử phòng đã đăng
            </MenuItem>
            {currentUser?.uid ? (
              <MenuItem onClick={handleSignOut}>
                <LogoutIcon sx={{ marginRight: 1 }} />
                Đăng xuất
              </MenuItem>
            ) : (
              <MenuItem component={Link} href="/login">
                <LoginIcon sx={{ marginRight: 1 }} />
                Đăng nhập
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}