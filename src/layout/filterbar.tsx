import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CustomCheckbox from "../components/dialog/filter/customCheckbox";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import { useState, useEffect } from "react";
import { EOrderDirection, ERoomType } from "../interfaces/room";

interface IProps {
  handleDialogToggle: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleParams: (param: any) => void;
}

export default function Filterbar(props: Readonly<IProps>) {
  const [type, setTypes] = useState<{
    house: boolean;
    apartment: boolean;
    homestay: boolean;
  }>({ house: false, apartment: false, homestay: false });

  const [sortOptions, setSortOptions] = useState(EOrderDirection.PLUS_DATE);

  const handlePickTypes = (value: string) => {
    if (value === "house") {
      setTypes({ house: !type.house, apartment: false, homestay: false });
    } else if (value === "apartment") {
      setTypes({ house: false, apartment: !type.apartment, homestay: false });
    } else if (value === "homestay") {
      setTypes({ homestay: !type.homestay, apartment: false, house: false });
    }
  };

  useEffect(() => {
    let typeValue: string = "";
    // const typesArray: string[] = [];
    // if (types.house) {
    //   typesArray.push("PHONGTRO");
    // }
    // if (types.apartment) {
    //   typesArray.push("CCMN");
    // }
    // if (types.homestay) {
    //   typesArray.push("Homestay");
    // }

    // if (typesArray.length === 3) {
    //   typesArray.pop();
    //   typesArray.pop();
    //   typesArray.pop();
    // }
    if (type.house) {
      typeValue = ERoomType.PHONGTRO;
    } else if (type.apartment) {
      typeValue = ERoomType.CCMN;
    } else if (type.homestay) {
      typeValue = ERoomType.Homestay;
    } else if (
      type.house === false &&
      type.apartment === false &&
      type.homestay === false
    )
      typeValue = "";
    if (typeValue === "") {
      props.handleParams({
        type: "",
        sortOptions,
      });
    } else {
      props.handleParams({
        type: typeValue,
        sortOptions,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, sortOptions]);

  return (
    <Box
      component="div"
      sx={{
        marginTop: 1,
        backgroundColor: "#fff",
        width: "80%",
        marginX: "auto",
        borderRadius: "20px",
        paddingY: 2
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", left: 30 }}>
          <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
            <InputLabel id="sort-select-label">Sắp xếp</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortOptions}
              label="Sắp xếp"
              onChange={(e) =>
                setSortOptions(e.target.value as EOrderDirection)
              }
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
        <Box onClick={() => handlePickTypes("house")}>
          {type.house ? (
            <CustomCheckbox
              icon={<HomeOutlinedIcon sx={{ fontSize: 40, color: "#fff" }} />}
              title="Nhà trọ"
              borderRadius={5}
              borderStyle="solid"
              borderWidth={1}
              height={50}
              backgroundColor="#40A578"
              color="#fff"
              fontSize="22px"
              fontWeight="700"
              paddingX={4}
              paddingY={2}
            />
          ) : (
            <CustomCheckbox
              icon={<HomeOutlinedIcon sx={{ fontSize: 40, color: "gray" }} />}
              title="Nhà trọ"
              backgroundColor="transparent"
              color="gray"
              fontSize="22px"
              fontWeight="700"
              height={50}
              paddingX={4}
              paddingY={2}
            />
          )}
        </Box>
        <Box onClick={() => handlePickTypes("apartment")}>
          {type.apartment ? (
            <CustomCheckbox
              icon={
                <ApartmentOutlinedIcon sx={{ fontSize: 40, color: "#fff" }} />
              }
              title="Chung cư mini"
              borderRadius={5}
              borderStyle="solid"
              borderWidth={1}
              height={50}
              backgroundColor="#40A578"
              color="#fff"
              fontSize="22px"
              fontWeight="700"
              paddingX={4}
              paddingY={2}
            />
          ) : (
            <CustomCheckbox
              icon={
                <ApartmentOutlinedIcon sx={{ fontSize: 40, color: "gray" }} />
              }
              title="Chung cư mini"
              backgroundColor="transparent"
              color="gray"
              fontSize="22px"
              fontWeight="700"
              height={50}
              paddingX={4}
              paddingY={2}
            />
          )}
        </Box>
        <Box onClick={() => handlePickTypes("homestay")}>
          {type.homestay ? (
            <CustomCheckbox
              icon={
                <HomeWorkOutlinedIcon sx={{ fontSize: 40, color: "#fff" }} />
              }
              title="Homestay"
              borderRadius={5}
              borderStyle="solid"
              borderWidth={1}
              height={50}
              backgroundColor="#40A578"
              color="#fff"
              fontSize="22px"
              fontWeight="700"
              paddingX={4}
              paddingY={2}
            />
          ) : (
            <CustomCheckbox
              icon={
                <HomeWorkOutlinedIcon sx={{ fontSize: 40, color: "gray" }} />
              }
              title="Homestay"
              backgroundColor="transparent"
              color="gray"
              fontSize="22px"
              fontWeight="700"
              height={50}
              paddingX={4}
              paddingY={2}
            />
          )}
        </Box>

        <Box
          sx={{
            backgroundColor: "#DCDCDC",
            paddingY: 1,
            paddingX: 2,
            width: "fit-content",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 10,
            position: "absolute",
            right: 30,
            cursor: "pointer",
          }}
          onClick={props.handleDialogToggle}
        >
          <FilterAltOutlinedIcon sx={{ color: "gray", marginRight: 1 }} />
          <Typography
            component="p"
            sx={{
              fontWeight: 700,
              fontSize: "22px",
              lineHeight: "30.26px",
              color: "gray",
            }}
          >
            Bộ lọc
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
