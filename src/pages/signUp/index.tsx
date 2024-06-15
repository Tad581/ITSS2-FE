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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../index.css";
import { UserAPI } from "../../api/userAPI";
import dayjs from "dayjs";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    displayName: "",
    role: 0,
    avatarUrl: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
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
    gender: Yup.string().required("Giới tính là bắt buộc"),
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
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      if (file == null) return;
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});

            await UserAPI.createUser({
              userName: email,
              passWord: password,
              role: 1,
              avatarUrl: downloadURL,
              phoneNumber,
              gender,
              dateOfBirth: dayjs(dateOfBirth).toISOString(),
              fullName: displayName,
              firebaseId: res.user.uid,
            });
            navigate("/");
          } catch (err) {
            console.error("Error creating user in Firestore or UserAPI", err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.error("Error creating user with Firebase auth", err);
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          width: "400px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="h2"
          sx={{
            color: "#5d5b8d",
            fontWeight: "bold",
            fontSize: "24px",
            marginBottom: "20px",
          }}
        >
          Đăng ký tài khoản
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="file"
                style={{
                  marginBottom: "20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="avatar preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  <Box
                    component="img"
                    src="/addAvatar.png"
                    alt="add avatar"
                    sx={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <Box
                  component="span"
                  sx={{
                    color: "#8da4f1",
                    fontSize: "14px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textAlign: "center",
                  }}
                >
                  Thêm avatar
                </Box>
              </label>
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

              <Field
                as={OutlinedInput}
                name="displayName"
                type="text"
                placeholder="Họ tên"
                sx={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
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
                sx={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
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
                sx={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
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
                sx={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="custom-error-message"
              />

              <FormControl sx={{ marginBottom: "10px", width: "100%" }}>
                <InputLabel id="gender-label">Giới tính</InputLabel>
                <Field
                  as={Select}
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  sx={{ minWidth: "200px", width: "100%" }}
                >
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                  <MenuItem value="other">Khác</MenuItem>
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
                sx={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
              />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="custom-error-message"
              />

              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  backgroundColor: "#40A578",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#357e61",
                  },
                  marginBottom: "10px",
                  width: "100%",
                }}
              >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </Button>

              {err && (
                <Box sx={{ color: "red", marginTop: "10px" }}>
                  Có lỗi xảy ra trong quá trình đăng ký.
                </Box>
              )}
            </Form>
          )}
        </Formik>

        <Box sx={{ fontSize: "14px" }}>
          Bạn đã có tài khoản? Đăng nhập tại đây <Link to="/login">Login</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
