import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AdminHeader from "../../../layout/adminHeader";
import RoomChart from "./components/roomChart";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { RoomAPI } from "../../../api/roomAPI";
import "react-datepicker/dist/react-datepicker.css";

const AdminRooms: React.FC = () => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(new Date());
  const [roomData, setRoomData] = useState<
    { date: string; count: number }[]
  >([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      const response = await RoomAPI.staticRoom(
        dayjs(startDate, "YYYY-MM-DD").toISOString(),
        dayjs(endDate, 'YYYY-MM-DD').toISOString()
      );
      const data = response.map((item: any) => ({
        date: dayjs(item.date).format("DD/MM/YYYY"),
        count: item.count,
      }))
      setRoomData(data);
    };
    fetchRoomData().catch((error) => console.log(error));
  }, [startDate, endDate]);

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
      }}
    >
      <AdminHeader />
      <Box sx={{ marginTop: 5, paddingX: 5 }}>
        <Typography variant="h4" gutterBottom textAlign={"center"}>
          Quản lý phòng
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Box sx={{ marginRight: 5, display: "flex" }}>
            <Typography variant="h6" gutterBottom mr={3}>
              Ngày bắt đầu:
            </Typography>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
            />
          </Box>
          <Box sx={{ marginRight: 5, display: "flex" }}>
            <Typography variant="h6" gutterBottom mr={3}>
              Ngày kết thúc:
            </Typography>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy/MM/dd"
            />
          </Box>
        </Box>
        <Box sx={{ marginTop: 5 }}>
          <RoomChart data={roomData} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminRooms;
