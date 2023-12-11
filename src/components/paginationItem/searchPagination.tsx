import { Box, Pagination, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import CardItem from '../cardItem/search';
import FilterDialog from '../filterDialog';
import Filterbar from '../../layout/filterbar';
import { RoomAPI } from '../../api/roomAPI';
import { IRoom, IRoomsParams, EOrderDirection } from '../../interfaces/room';

const pageSize = 8;

export default function ItemPagination() {
  const [showData, setShowData] = useState<IRoom[]>([]);
  const [isDialogShow, setIsDialogShow] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: pageSize,
    total: 0,
  });
  const [roomsParams, setRoomsParams] = useState<IRoomsParams>({
    page: pagination.page,
    page_size: pageSize,
    order_direction: EOrderDirection.DESC,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await RoomAPI.getAll();
      if (response) {
        setShowData(response.data);
        setPagination(response.pagination);
      }
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(event);
    setPagination({ ...pagination, page: page });
  };

  const handleDialogToggle = () => {
    setIsDialogShow((isDialogShow) => !isDialogShow);
  };

  return (
    <Box>
      <Filterbar handleDialogToggle={handleDialogToggle} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          spacing={5}
          sx={{
            width: '80%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 1,
          }}
        >
          {showData.length > 0 ? (
            showData.map((item: IRoom) => (
              <Grid item sm={12} md={6} lg={3} xl={2} key={item.id}>
                <CardItem
                  id={item.id}
                  name={item.name}
                  room_image={item.room_image[0]?.image_url}
                  address={item.address}
                  distance_to_school={item.distance_to_school}
                  area={item.area}
                />
              </Grid>
            ))
          ) : (
            <Typography mt={10}>Không có dữ liệu</Typography>
          )}
        </Grid>
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
      <FilterDialog
        open={isDialogShow}
        handleClose={() => setIsDialogShow(false)}
        handleParams={(param) => setRoomsParams({ ...roomsParams, ...param })}
      ></FilterDialog>
    </Box>
  );
}
