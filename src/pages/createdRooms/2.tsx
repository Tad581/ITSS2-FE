import { Box, Modal, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { defaultUserId } from "../../constant";
import { IRoomCreateInput } from "../../interfaces/room";
import { toast } from "react-toastify";
import { RoomAPI } from "../../api/roomAPI";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import { Form } from "react-router-dom";

type ComboBoxProps = {
  options: any[];
  label: string;
  title: string;
  name?: string;
  value: any;
  onChange?: any;
};

function ComboBox(props: ComboBoxProps) {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={2}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 400, my: 1, marginRight: 1 }}>
        {props.title}
      </Typography>
      {/* <Autocomplete
          disablePortal
          options={props.options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={props.label} />}
        /> */}
      <select
        id={props.name}
        style={{ border: "1px solid black", height: 40, width: 200 }}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      >
        {props.options.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </Box>
  );
}

const roomTypeOptions = [
  { label: "Chung cư mini", value: "CCMN" },
  { label: "Phòng trọ", value: "PHONGTRO" },
  { label: "Homestay", value: "Homestay" },
];

const enclosedToiletOptions = [
  { label: "Chung", value: true },
  { label: "Khép kín", value: false },
];

const tagOptions = [
  { label: "Đã đầy", value: "Full" },
  { label: "Còn trống", value: "Empty" },
];

ComboBox.defaultProps = {
  options: [
    { label: "The Shawshank Redemption", value: 1994 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
  ],
};

type CreateRoomModalProps = {
  isOpen: boolean;
  handleClose?: () => void;
  // handleSubmit?: (formData: FormData) => void;
  roomId: string | null;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pt: 50,
};

const CreateRoomModal = (props: CreateRoomModalProps) => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const [btnDisabled, setBtnDisabled] = useState<any>(false);
  const [existedImages, setExistedImages] = useState<string[]>([]);

  const [initialValues, setInitialValues] = useState<IRoomCreateInput>({
    ownerId: defaultUserId,
    Name: "",
    Address: "",
    Type: "Homestay",
    Area: 0,
    Price: 0,
    ElectronicPrice: 0,
    WaterPrice: 0,
    Description: "",
    WifiInternet: false,
    WashingMachine: false,
    AirConditioner: false,
    WaterHeater: false,
    Refrigerator: false,
    SafedDevice: false,
    EnclosedToilet: false,
    Tag: "Empty",
    Images: [],
  });

  const validationSchema = Yup.object({
    Name: Yup.string().required("Tên phòng là bắt buộc"),
    Description: Yup.string().required("Mô tả là bắt buộc"),
    Address: Yup.string().required("Địa chỉ là bắt buộc"),
    Price: Yup.number()
      .required("Giá là bắt buộc")
      .positive("Giá phải là số dương"),
    Area: Yup.number()
      .required("Diện tích là bắt buộc")
      .positive("Diện tích phải là số dương"),
    ElectronicPrice: Yup.number()
      .required("Giá điện là bắt buộc")
      .positive("Giá điện phải là số dương"),
    WaterPrice: Yup.number()
      .required("Giá nước là bắt buộc")
      .positive("Giá nước phải là số dương"),
  });

  const handleSubmit = async (values: IRoomCreateInput) => {
    const {
      Name,
      Address,
      Type,
      Area,
      Price,
      ElectronicPrice,
      WaterPrice,
      Description,
      WifiInternet,
      WashingMachine,
      AirConditioner,
      WaterHeater,
      Refrigerator,
      SafedDevice,
      EnclosedToilet,
      Tag,
      ownerId,
    } = values;
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < uploadFiles.length; i++) {
      formData.append(`Images`, uploadFiles[i]);
    }
    formData.append("ownerId", ownerId as unknown as string);
    formData.append("Name", Name as unknown as string);
    formData.append("Address", Address as unknown as string);
    formData.append("Type", Type as unknown as string);
    formData.append("Tag", Tag as unknown as string);
    formData.append("Area", Area as unknown as string);
    formData.append("Price", Price as unknown as string);
    formData.append("ElectronicPrice", ElectronicPrice as unknown as string);
    formData.append("WaterPrice", WaterPrice as unknown as string);
    formData.append("Description", Description as unknown as string);
    formData.append("WifiInternet", WifiInternet as unknown as string);
    formData.append("WashingMachine", WashingMachine as unknown as string);
    formData.append("AirConditioner", AirConditioner as unknown as string);
    formData.append("WaterHeater", WaterHeater as unknown as string);
    formData.append("Refrigerator", Refrigerator as unknown as string);
    formData.append("SafedDevice", SafedDevice as unknown as string);
    formData.append("EnclosedToilet", EnclosedToilet as unknown as string);
    try {
      let response = null;
      if (props.roomId) {
        response = await RoomAPI.updateRoom(props.roomId, formData);
      } else {
        response = await RoomAPI.createRoom(formData);
      }
      if (response.message === "Success") {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      setBtnDisabled(false);
      if (props?.handleClose) {
        props.handleClose();
        setBtnDisabled(false);
      }

      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!props.isOpen) {
      setExistedImages([]);
    }
    async () => {
      if (props.isOpen && props.roomId) {
        const room = await RoomAPI.getOne(props.roomId);
        const roomData = {
          ownerId: defaultUserId,
          Name: room.data.Name,
          Address: room.data.Address,
          Type: room.data.Type,
          Area: room.data.Area,
          Price: room.data.Price,
          ElectronicPrice: room.data.ElectronicPrice,
          WaterPrice: room.data.WaterPrice,
          Description: room.data.Description,
          WifiInternet: room.data.WifiInternet,
          WashingMachine: room.data.WashingMachine,
          AirConditioner: room.data.AirConditioner,
          WaterHeater: room.data.WaterHeater,
          Refrigerator: room.data.Refrigerator,
          SafedDevice: room.data.SafedDevice,
          EnclosedToilet: room.data.EnclosedToilet,
          Tag: room.data.Tag,
          Images: room.data.roomImages,
        };
        setInitialValues(roomData);
        setExistedImages(room.data.roomImages);
      }
    };
  }, [props.isOpen, props.roomId]);

  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflow: "scroll",
          maxHeight: "90%",
          top: "5%",
          // left: '10%',
          position: "absolute",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Box sx={style}>
                <Field
                  as={OutlinedInput}
                  name="displayName"
                  type="text"
                  placeholder="Họ tên"
                  sx={{
                    border: "none",
                    width: "250px",
                    borderBottom: "1px solid #a7bcff",
                    "&::placeholder": {
                      color: "rgb(175, 175, 175)",
                    },
                  }}
                  size="medium"
                />
                <ErrorMessage
                  name="displayName"
                  component="div"
                  className="custom-error-message"
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default CreateRoomModal;
