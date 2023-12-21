import Search from "./search"
import Navbar from "./navbar";
import Chats from "./chats";
import {Box} from '@mui/material'

const Sidebar = () => {
  return (
    <Box className="sidebar" sx={{
      flex: 1,
      backgroundColor: '#3e3c61',
      position: 'relative',
    }}>
      <Navbar />
      <Search/>
      <Chats/>
    </Box>
  );
};

export default Sidebar;
