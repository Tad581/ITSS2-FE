import { Box, Pagination, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import CardItem from "../cardItem/search";
import FilterDialog from "../dialog/filter";
import Filterbar from "../../layout/filterbar";
import { RoomAPI } from "../../api/roomAPI";
import { IRoom, IRoomsParams, EOrderDirection } from "../../interfaces/room";

interface IProps {
  keyword: string;
}

export default function ItemPagination(props: IProps) {
  const [showData, setShowData] = useState<IRoom[]>([]);
  const [isDialogShow, setIsDialogShow] = useState<boolean>(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 12,
    totalRecords: 0,
  });
  const [roomsParams, setRoomsParams] = useState<IRoomsParams>({
    page: pagination.currentPage,
    pageSize: 12,
    sortOptions: EOrderDirection.PLUS_DATE,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(event);
    setPagination({ ...pagination, currentPage: page });
    setRoomsParams({ ...roomsParams, page: page });
  };

  const handleDialogToggle = () => {
    setIsDialogShow((isDialogShow) => !isDialogShow);
  };

  useEffect(() => {
    if (props.keyword !== undefined) {
      setRoomsParams({ ...roomsParams, address: props.keyword });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.keyword]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await RoomAPI.getAll(roomsParams);
      const { currentPage, pageSize, totalRecords } = response.data;
      if (response) {
        setShowData(response.data.content);
        setPagination({ currentPage, pageSize, totalRecords });
      }
    };
    fetchData().catch((error) => console.log(error));
  }, [roomsParams]);

  return (
    <Box>
      <Filterbar
        handleDialogToggle={handleDialogToggle}
        handleParams={(param) => setRoomsParams({ ...roomsParams, ...param })}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={5}
          sx={{
            width: "80%",
            height: "auto",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: 2,
            borderRadius: 5,
            paddingBottom: "40px",
            background: "#fff",
            minHeight: "100vh",
            paddingRight: "40px",
            marginX: "auto"
          }}
        >
          {showData.length > 0 ? (
            showData.map((item: IRoom) => (
              <Grid item sm={12} md={6} lg={4} xl={3} key={item.roomId}>
                <CardItem
                  id={item.roomId}
                  name={item.name}
                  roomImages={item.roomImages[0]?.imageUrl}
                  address={item.address}
                  area={item.area}
                  reviews={item.reviews}
                  tag={item.roomAttribute!.tag}
                  price={item.price}
                  createdOnDate={item.createdOnDate}
                />
              </Grid>
            ))
          ) : (
            <Typography mt={10} mx="auto" textAlign="center">
              Không có dữ liệu
            </Typography>
          )}
        </Grid>
        {Math.ceil(pagination.totalRecords / pagination.pageSize) <= 1 ? (
          <Box sx={{ marginBottom: 10 }}></Box>
        ) : (
          <Pagination
            sx={{ marginY: 6 }}
            count={Math.ceil(pagination.totalRecords / pagination.pageSize)}
            onChange={handlePageChange}
            page={pagination.currentPage}
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
