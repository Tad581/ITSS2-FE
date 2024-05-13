import React from 'react'
import { Box } from '@mui/material';
import Header from '../../layout/header';
import CreatedRoomsPagination from '../../components/paginationItem/createdRoomsPagination';
import CreateRoomModal from './createRoomModal';

export default function CreatedRooms() {
  const [open, setOpen] = React.useState(false);
  const [roomId, setRoomId] = React.useState<string | null>(null);
  const handleOpen = React.useCallback(() => setOpen(true), []);
  const handleClose = React.useCallback(() => {
    setOpen(false)
    setRoomId(null);
  }, []);

  const handleEditClick = React.useCallback((id: string) => {
    setRoomId(id);
    setOpen(true);
    console.log(id);
  }, []);

  return (
    <Box
      sx={{
        height: 'auto',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F5F5F5',
      }}
    >
      <Header displayButton={true} onButtonClick={handleOpen} />
      <CreatedRoomsPagination  handleEditClick={handleEditClick}/>
      <CreateRoomModal
        isOpen={open}
        handleClose={handleClose}
        roomId={roomId}
      />
    </Box>
  );
}
