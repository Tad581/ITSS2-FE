import { Box } from '@mui/material';
import Header from '../../layout/header';
import CreatedRoomsPagination from '../../components/paginationItem/createdRoomsPagination';
export default function CreatedRooms() {
  return (
    <Box
      sx={{
        height: 'auto',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F5F5F5',
      }}
    >
      <Header />
      <CreatedRoomsPagination />
    </Box>
  );
}
