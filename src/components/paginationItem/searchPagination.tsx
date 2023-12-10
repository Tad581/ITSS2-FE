import { Box, Pagination, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import CardItem from '../cardItem/search';
import FilterDialog from '../filterDialog';
import Filterbar from '../../layout/filterbar';
import { RoomAPI } from '../../api/roomAPI';
import { IRoom } from '../../interfaces/room';

const pageSize = 8;

export default function ItemPagination() {
  const [showData, setShowData] = useState<IRoom[]>([]);
  const [isDialogShow, setIsDialogShow] = useState<boolean>(false);
  // For pagination
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: pageSize,
    total: 0,
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

  // useEffect(() => {
  //   const data = houseData.slice(pagination.from, pagination.to);
  //   setPagination({ ...pagination, count: houseData.length });
  //   setShowData(data);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [houseData, pagination.from, pagination.to]);

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
            justifyContent: 'center',
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
        {pagination.total === 0 ? (
          <></>
        ) : (
          <Pagination
            sx={{ marginY: 6 }}
            count={pagination.total}
            onChange={handlePageChange}
            page={pagination.page}
          />
        )}
      </Box>
      <FilterDialog
        open={isDialogShow}
        handleClose={() => setIsDialogShow(false)}
      ></FilterDialog>
    </Box>
  );
}
