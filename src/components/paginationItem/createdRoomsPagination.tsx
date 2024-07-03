import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import CreatedRooms from "../cardItem/createdRooms";
import { RoomAPI } from "../../api/roomAPI";
import {
  EOrderDirection,
  EOrderDirection2,
  EOrderType2,
  IRoom,
} from "../../interfaces/room";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDialog from "../dialog/confirm";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

type CreatedRoomsPaginationProps = {
  handleEditClick?: (id: string) => void;
};

export default function CreatedRoomsPagination(
  props: CreatedRoomsPaginationProps
) {
  const { currentUser }: any = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string>();

  const [showData, setShowData] = useState<IRoom[]>([]);
  // For pagination

  const [roomsParams, setRoomsParams] = useState<{
    romOwnerId: string;
    sortOptions: EOrderType2;
    sortOrder: EOrderDirection2;
    sortLabel?: EOrderDirection
  }>({
    romOwnerId: currentUser.localId,
    sortOptions: EOrderType2.TIME,
    sortOrder: EOrderDirection2.DESC,
    sortLabel: EOrderDirection.MINUS_DATE,
  });

  useEffect(() => {
    const fetchData = async () => {
      const params = {...roomsParams}
      delete params.sortLabel
      const response = await RoomAPI.getOwnerRooms(params);
      if (response) {
        setShowData(response);
      }
    };
    fetchData().catch((error) => console.log(error));
  }, [roomsParams, isOpen]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            padding: 2,
            paddingX: 5,
            alignSelf: "flex-start",
            marginTop: -7,
            marginBottom: 2,
          }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: 20 }}>
            Phòng đã đăng
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#fff",
            alignSelf: "flex-end",
          }}
        >
          <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
            <InputLabel id="sort-select-label">Sắp xếp</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={roomsParams.sortLabel}
              label="Sắp xếp"
              onChange={(e) => {
                if (e.target.value === EOrderDirection.PLUS_PRICE) {
                  setRoomsParams({
                    ...roomsParams,
                    sortOptions: EOrderType2.PRICE,
                    sortOrder: EOrderDirection2.ASC,
                    sortLabel: EOrderDirection.PLUS_PRICE,
                  });
                } else if (e.target.value === EOrderDirection.MINUS_PRICE) {
                  setRoomsParams({
                    ...roomsParams,
                    sortOptions: EOrderType2.PRICE,
                    sortOrder: EOrderDirection2.DESC,
                    sortLabel: EOrderDirection.MINUS_PRICE,
                  });
                } else if (e.target.value === EOrderDirection.PLUS_AREA) {
                  setRoomsParams({
                    ...roomsParams,
                    sortOptions: EOrderType2.AREA,
                    sortOrder: EOrderDirection2.ASC,
                    sortLabel: EOrderDirection.PLUS_AREA,
                  });
                } else if (e.target.value === EOrderDirection.MINUS_AREA) {
                  setRoomsParams({
                    ...roomsParams,
                    sortOptions: EOrderType2.AREA,
                    sortOrder: EOrderDirection2.DESC,
                    sortLabel: EOrderDirection.MINUS_AREA,
                  });
                } else if (e.target.value === EOrderDirection.PLUS_DATE) {
                  setRoomsParams({
                    ...roomsParams,
                    sortOptions: EOrderType2.TIME,
                    sortOrder: EOrderDirection2.ASC,
                    sortLabel: EOrderDirection.PLUS_DATE,
                  });
                } else if (e.target.value === EOrderDirection.MINUS_DATE) {
                  setRoomsParams({
                    ...roomsParams,
                    sortOptions: EOrderType2.TIME,
                    sortOrder: EOrderDirection2.DESC,
                    sortLabel: EOrderDirection.MINUS_DATE,
                  });
                }
              }}
            >
              <MenuItem value={EOrderDirection.PLUS_PRICE}>
                Giá phòng tăng dần
              </MenuItem>
              <MenuItem value={EOrderDirection.MINUS_PRICE}>
                Giá phòng giảm dần
              </MenuItem>
              <MenuItem value={EOrderDirection.PLUS_AREA}>
                Diện tích tăng dần
              </MenuItem>
              <MenuItem value={EOrderDirection.MINUS_AREA}>
                Diện tích giảm dần
              </MenuItem>
              <MenuItem value={EOrderDirection.PLUS_DATE}>
                Thời gian xa nhất
              </MenuItem>
              <MenuItem value={EOrderDirection.MINUS_DATE}>
                Thời gian gần nhất
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        {showData?.length > 0 ? (
          showData.map((item) => (
            <>
              <CreatedRooms
                key={item?.roomId}
                id={item?.roomId}
                name={item?.name}
                price={item?.price}
                tag={item?.roomAttribute!.tag}
                area={item?.area}
                createdOnDate={item?.createdOnDate}
                imageUrl={item?.roomImages[0]?.imageUrl}
                handleOpenDialog={() => setIsOpen(true)}
                handleSelectedRoomId={(roomId: string) =>
                  setSelectedRoomId(roomId)
                }
                handleEditClick={props.handleEditClick}
              />
              <Divider sx={{ marginY: 3, marginX: "auto", width: "100%" }} />
            </>
          ))
        ) : (
          <Typography mt={10}>Không có dữ liệu</Typography>
        )}
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ConfirmDialog
        handleClose={() => setIsOpen(false)}
        open={isOpen}
        roomId={selectedRoomId}
      />
    </Box>
  );
}
