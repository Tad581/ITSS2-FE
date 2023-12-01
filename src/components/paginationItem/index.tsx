import { Box, Pagination, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { houseData } from '../../assets/data/house';
import CardItem from '../cardItem';

const pageSize = 8;

export default function ItemPagination() {
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
      }}
    >
      <Box>
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          <Grid container spacing={5} sx={{ width: '80%' }}>
            {showData.length > 0 ? (
              showData.map(() => (
                <Grid item sm={12} md={6} lg={3} xl={2}>
                  <CardItem />
                </Grid>
              ))
            ) : (
              <Typography mt={10}>Không có dữ liệu</Typography>
            )}
          </Grid>
        </Box>
      </Box>
      {houseData.length < pageSize ? (
        <></>
      ) : (
        <Pagination
          sx={{ marginY: 6 }}
          count={Math.ceil(houseData.length / pageSize)}
          onChange={handlePageChange}
          page={pagination.page}
        />
      )}
    </Box>
  );
}
