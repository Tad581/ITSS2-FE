import { Box, Pagination, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import CreatedRooms from '../cardItem/createdRooms';
import { RoomAPI } from '../../api/roomAPI';
import { IRoom, EOrderDirection } from '../../interfaces/room';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from '../dialog/confirm';

const pageSize = 5;

export default function CreatedRoomsPagination() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number>();

  const [showData, setShowData] = useState<IRoom[]>([]);
  // For pagination
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: pageSize,
    total: 0,
  });

  const [roomsParams, setRoomsParams] = useState({
    owner_id: 1,
    page: pagination.page,
    page_size: pageSize,
    order_direction: EOrderDirection.DESC,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await RoomAPI.getOwnerRooms(roomsParams);
      if (response) {
        setShowData(response.data);
        setPagination(response.pagination);
      }
    };
    fetchData().catch((error) => console.log(error));
  }, [roomsParams, isOpen]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(event);
    setPagination({ ...pagination, page: page });
    setRoomsParams({ ...roomsParams, page: page });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <Box
        sx={{
          width: '70%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            padding: 2,
            alignSelf: 'flex-start',
            marginTop: -7,
          }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: 20 }}>
            Phòng đã đăng
          </Typography>
        </Box>
        {showData.length > 0 ? (
          showData.map((item) => (
            <CreatedRooms
              key={item?.id}
              id={item?.id}
              name={item?.name}
              price={item?.price}
              area={item?.area}
              image_url={item?.room_image[0]?.image_url}
              handleOpenDialog={() => setIsOpen(true)}
              handleSelectedRoomId={(room_id: number) =>
                setSelectedRoomId(room_id)
              }
            />
          ))
        ) : (
          <Typography mt={10}>Không có dữ liệu</Typography>
        )}
        {Math.ceil(pagination.total / pageSize) <= 1 ? (
          <Box sx={{ marginBottom: 10 }}></Box>
        ) : (
          <Pagination
            sx={{ marginY: 6 }}
            count={Math.ceil(pagination.total / pageSize)}
            onChange={handlePageChange}
            page={pagination.page}
          />
        )}
      </Box>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <ConfirmDialog
        handleClose={() => setIsOpen(false)}
        open={isOpen}
        room_id={selectedRoomId}
      />
    </Box>
  );
}
