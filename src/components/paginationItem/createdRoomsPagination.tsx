import { Box, Pagination, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { houseData } from '../../assets/data/house';
import CreatedRooms from '../cardItem/createdRooms';

const pageSize = 5;

export default function CreatedRoomsPagination() {
  const [showData, setShowData] = useState(houseData);
  // For pagination
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
    page: 1,
  });

  useEffect(() => {
    const data = houseData.slice(pagination.from, pagination.to);
    setPagination({ ...pagination, count: houseData.length });
    setShowData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houseData, pagination.from, pagination.to]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(event);
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to, page: page });
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
          showData.map((item) => <CreatedRooms key={item.id} />)
        ) : (
          <Typography mt={10}>Không có dữ liệu</Typography>
        )}
        {houseData.length < pageSize ? (
          <></>
        ) : (
          <Pagination
            sx={{ marginTop: 4, marginBottom: 3 }}
            count={Math.ceil(houseData.length / pageSize)}
            onChange={handlePageChange}
            page={pagination.page}
          />
        )}
      </Box>
    </Box>
  );
}
