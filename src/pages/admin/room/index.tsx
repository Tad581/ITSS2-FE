import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { UserAPI } from "../../../api/userAPI";
import RoomChart from "./components/roomChart";
import DateRangePickerComponent from "./components/dateRangePicker";
import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";

const AdminRooms: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange<dayjs.Dayjs>>([dayjs().subtract(1, 'month'), dayjs()]);
  const [roomData, setRoomData] = useState<{ date: string, newRooms: number }[]>([]);

  const dummyData = [
    { date: '2023-06-01', newRooms: 5 },
    { date: '2023-06-02', newRooms: 3 },
    { date: '2023-06-03', newRooms: 8 },
    { date: '2023-06-04', newRooms: 2 },
    { date: '2023-06-05', newRooms: 6 },
    { date: '2023-06-06', newRooms: 4 },
    { date: '2023-06-07', newRooms: 7 },
  ];

  useEffect(() => {
    const fetchRoomData = async () => {
    //   const response = await UserAPI.getRoomData({
    //     startDate: dateRange[0]?.format('YYYY-MM-DD'),
    //     endDate: dateRange[1]?.format('YYYY-MM-DD'),
    //   });
    //   setRoomData(response);
    };
    fetchRoomData().catch((error) => console.log(error));
  }, [dateRange]);

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Quản lý phòng
      </Typography>
      <DateRangePickerComponent dateRange={dateRange} setDateRange={setDateRange} />
      <Box sx={{ marginTop: 5 }}>
        <RoomChart data={dummyData} />
      </Box>
    </Container>
  );
};

export default AdminRooms;
