import Search from './search';
import Chats from './chats';
import { Box, Divider } from '@mui/material';

const Sidebar = () => {
  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
        minWidth: '400px',
        minHeight: '100%'
      }}
    >
      <Search />
      <Divider />
      <Chats />
    </Box>
  );
};

export default Sidebar;
