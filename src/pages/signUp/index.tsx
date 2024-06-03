import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  OutlinedInput,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { UserAPI } from "../../api/userAPI";
import { EGender } from "../../interfaces/user";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../index.css";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    displayName: "",
    role: 0,
    avatarUrl: "",
    phoneNumber: "",
    gender: EGender.OTHER,
    dateOfBirth: new Date(),
    file: null,
  };

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required("Họ tên là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc"),
    phoneNumber: Yup.string().required("Điện thoại là bắt buộc"),
    gender: Yup.mixed()
      .oneOf(Object.values(EGender))
      .required("Giới tính là bắt buộc"),
    dateOfBirth: Yup.date().required("Ngày sinh là bắt buộc"),
    file: Yup.mixed().required("Ảnh đại diện là bắt buộc"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const {
      displayName,
      email,
      password,
      file,
      gender,
      dateOfBirth,
      phoneNumber,
    } = values;
    setLoading(true);
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      if (file == null) return;
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});

            // await UserAPI.createaUser({
            //   userName: email,
            //   passWord: password,
            //   role: 0,
            //   avatarUrl: downloadURL,
            //   phoneNumber,
            //   gender,
            //   dateOfBirth,
            //   fullName: displayName,
            //   firebaseId: res.user.uid,
            // });
            navigate("/");
          } catch (err) {
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#40A578",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px 60px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Box
          component="span"
          sx={{
            color: "#5d5b8d",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          BKHome Chat
        </Box>
        <Box
          component="span"
          sx={{
            color: "#5d5b8d",
            fontSize: "20px",
          }}
        >
          Đăng ký
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
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

              <Field
                as={OutlinedInput}
                name="email"
                type="text"
                placeholder="Email"
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
                name="email"
                component="div"
                className="custom-error-message"
              />

              <Field
                as={OutlinedInput}
                name="password"
                type="password"
                placeholder="Mật khẩu"
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
                name="password"
                component="div"
                className="custom-error-message"
              />

              <Field
                as={OutlinedInput}
                name="phoneNumber"
                type="text"
                placeholder="Điện thoại"
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
                name="phoneNumber"
                component="div"
                className="custom-error-message"
              />

              <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
                <InputLabel id="gender-select-label">Giới tính</InputLabel>
                <Field
                  as={Select}
                  labelId="gender-select-label"
                  id="gender-select"
                  name="gender"
                  label="Giới tính"
                >
                  <MenuItem value={EGender.MALE}>Nam</MenuItem>
                  <MenuItem value={EGender.FEMALE}>Nữ </MenuItem>
                  <MenuItem value={EGender.OTHER}>Khác</MenuItem>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="custom-error-message"
                />
              </FormControl>

              <Field
                as={OutlinedInput}
                name="dateOfBirth"
                type="date"
                placeholder="Ngày sinh"
                sx={{
                  border: "none",
                  width: "250px",
                  borderBottom: "1px solid #a7bcff",
                  "&::placeholder": {
                    color: "rgb(175, 175, 175)",
                  },
                }}
                size="medium"
                // value={values.dateOfBirth}
                // onChange={(e: any) =>
                //   setFieldValue("dateOfBirth", new Date(e.target.value))
                // }
              />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="custom-error-message"
              />

              <input
                type="file"
                id="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(event) => {
                  if (event.currentTarget.files?.[0]) {
                    setFieldValue("file", event.currentTarget.files[0]);
                    const reader = new FileReader();
                    reader.readAsDataURL(event.currentTarget.files[0]);
                    reader.onload = () => {
                      setPreviewImage(reader.result as string);
                    };
                  }
                }}
              />
              <Box
                component="label"
                htmlFor="file"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#8da4f1",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <Box
                  component="img"
                  src="/addAvatar.png"
                  alt=""
                  sx={{ width: "32px" }}
                />
                <Box component="span">Thêm avatar</Box>
              </Box>
              {previewImage && (
                <Box>
                  <Box
                    component="img"
                    src={previewImage}
                    alt="avatar preview"
                    sx={{
                      width: "auto",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}

              <Button
                disabled={loading}
                style={{
                  backgroundColor: "#40A578",
                  color: "white",
                  padding: "10px",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
                type="submit"
              >
                Đăng ký
              </Button>
              {loading && "Ảnh đang được upload..."}
              {err && <Box component="span">Có lỗi</Box>}
            </Form>
          )}
        </Formik>
        <Box
          component="p"
          sx={{
            color: "#5d5b8d",
            fontSize: "14px",
            marginTop: "10px",
          }}
        >
          Bạn đã có tài khoản? Đăng nhập tại đây <Link to="/login">Login</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
