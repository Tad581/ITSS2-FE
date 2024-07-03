import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  TextField,
  Rating,
  Grid,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import * as Yup from "yup";
import { IReviewParam } from "../../../interfaces/room";
import { ReviewAPI } from "../../../api/reviewAPI";
import { defaultUserId } from "../../../constant";
import {useContext} from 'react';
import { AuthContext } from '../../../context/authContext';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    paddingBottom: 20,
    minWidth: 500,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface IProps {
  handleClose: () => void;
  open: boolean;
  id: string;
}

interface DialogTitleProps {
  id: string;
  onClose: () => void;
  children?: React.ReactNode;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function MakeReview(props: IProps) {
  const {currentUser}:any = useContext(AuthContext);
  const initialValues: IReviewParam = {
    UserId: currentUser?.localId,
    Star: 0,
    content: "",
    RoomId: props.id,
    Images: [],
  };

  const validationSchema = Yup.object().shape({
    inputValue: Yup.number()
      .min(1, "Value must be at least 1")
      .max(5, "Value must be at most 5")
      .required("Value is required"),
  });

  const [formValue, setFormValue] = useState<IReviewParam>(initialValues);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [uploadFiles, setUploadFiles] = useState<any>([]);

  useEffect(() => {
    if (props.id !== undefined) {
      const tempFormValue = {
        ...formValue,
        roomId: parseInt(props.id as unknown as string, 10),
      };
      setFormValue(tempFormValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleOnchangeRatingStar = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => {
    console.log(
      "🚀 ~ file: index.tsx:107 ~ handleOnchangeRatingStar ~ event:",
      event
    );
    const tempStar = { ...formValue, Star: newValue };
    setFormValue(tempStar);
  };

  const handleOnchangeReview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const tempReview = { ...formValue, content: value };
    setFormValue(tempReview);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const file of uploadFiles) {
      formData.append("Images", file);
    }
  
    formData.append("RoomId", formValue.RoomId as unknown as string);
    formData.append("UserId", formValue.UserId as unknown as string);
    formData.append("Star", formValue.Star as unknown as string);
    formData.append("content", formValue.content);
  
    try {
      const response = await ReviewAPI.postOneReview(formData);

      if (response.message === 'Success') {
        toast.success('Đánh giá thành công!');
        props.handleClose();
        window.location.reload();
      } else {
        console.log('Đã xảy ra lỗi khi đánh giá:', response.data.message);
        toast.error('Đã xảy ra lỗi khi đánh giá.');
      }
    } catch (error) {
      console.error('Lỗi khi gửi đánh giá:', error);
      toast.error('Bạn đã đánh giá phòng này.');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const filesArray = [...uploadFiles];
    if (files) {
      const previewArray = Array.from(files).map((file) => {
        filesArray.push(file);
        return URL.createObjectURL(file);
      });
      setPreviewImages(previewArray);
      setUploadFiles(filesArray);
      // Handle the image field change here
    }
  };

  return (
    <Box>
    <ToastContainer />
    <BootstrapDialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.handleClose}
      >
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Viết đánh giá
        </Typography>
      </BootstrapDialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        <Form>
          <DialogContent dividers>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
              <Box sx={{ my: 0.5 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                  Đánh giá của bạn
                </Typography>
                <Box display={"flex"} alignItems={"center"}>
                  <Field
                    as={Rating}
                    name="Star"
                    label="Star"
                    type="number"
                    inputprops={{ min: 0, max: 5 }}
                    id="rating-star"
                    precision={1}
                    required
                    onChange={handleOnchangeRatingStar}
                    value={formValue.Star}
                  />
                  <Typography ml={2} fontSize={18}>
                    {formValue.Star}
                  </Typography>
                </Box>
                <ErrorMessage name="star" component="div" />
              </Box>

              <Box sx={{ my: 0.5 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, my: 1 }}>
                  Chi tiết
                </Typography>
                <Field
                  as={TextField}
                  name="content"
                  multiline
                  rows={4}
                  required
                  onChange={handleOnchangeReview}
                  value={formValue.content}
                  sx={{ width: "100%", my: 1 }}
                  placeholder="Tại sao bạn lại đánh giá như vậy?"
                />
                <ErrorMessage name="review" component="div" />
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: 16, fontWeight: 700, my: 1, width: "95%" }}
              >
                Ảnh
              </Typography>
              <Grid container spacing={2} width={"calc(100%)"}>
                {previewImages.map((previewImage) => (
                  <Grid item key={previewImage} sm={4} md={4} lg={4} xl={4}>
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        border: "1px solid black",
                        borderRadius: "10px",
                        aspectRatio: "1 / 1",
                      }}
                    />
                  </Grid>
                ))}
                <Grid item sm={4} md={4} lg={4} xl={4}>
                  <Box
                    sx={{
                      border: "1px solid black",
                      padding: "0px",
                      aspectRatio: "1 / 1",
                      cursor: "pointer",
                      borderRadius: "10px",
                    }}
                  >
                    <label
                      htmlFor="image-upload"
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <AddOutlinedIcon sx={{ fontSize: 60 }} />
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      name="Images"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      width="100%"
                      height="100%"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              autoFocus
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddOutlinedIcon />}
              sx={{ width: "20%" }}
            >
              Gửi
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </BootstrapDialog>
    </Box>
  );
}
