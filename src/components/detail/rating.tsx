import {
  Avatar,
  Box,
  Divider,
  Rating,
  Typography,
  Pagination,
  Button,
  Grid,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { IReview } from "../../interfaces/room";
import MakeReview from "../dialog/review";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
interface IProps {
  roomId?: string;
  rating: number;
  reviewCount: number;
  messages?: IReview[];
}

const pageSize = 2;

export default function RatingMessageList(props: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showData, setShowData] = useState<IReview[]>([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
    page: 1,
  });
  const { currentUser }: any = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.messages) {
      const data: IReview[] = props.messages?.slice(
        pagination.from,
        pagination.to
      );
      setPagination({ ...pagination, count: props.messages.length });
      setShowData(data);
    }
  }, [props.messages, pagination.from, pagination.to]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to, page: page });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" component="h4" sx={{ fontWeight: 600 }}>
          {!Number.isNaN(props.rating) ? props.rating.toFixed(1) : 0} /
          <span style={{ fontSize: 16, fontWeight: 400 }}>5.0</span>
          <Rating
            name="read-only"
            value={!Number.isNaN(props.rating) ? +props.rating.toFixed(1) : 0}
            readOnly
            precision={0.1}
            sx={{ marginX: 2 }}
          />
        </Typography>
        {currentUser.uid ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen(true)}
          >
            Viết đánh giá
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Đăng nhập để đánh giá
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="subtitle1" component="span">
          {props.reviewCount} đánh giá
        </Typography>
      </Box>
      {/* Rating message */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          py: 2,
        }}
      >
        {showData.length > 0 ? (
          showData.map((message) => {
            return <RatingMessage key={message.id} {...message} />;
          })
        ) : (
          <Typography>Không có review nào cho phòng trọ này</Typography>
        )}
      </Box>
      {props.messages && props.messages.length >= pageSize && (
        <Pagination
          count={Math.ceil(props.messages.length / pageSize)}
          onChange={handlePageChange}
          page={pagination.page}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 3,
          }}
        />
      )}
      {props.roomId && (
        <MakeReview
          handleClose={() => setIsOpen(false)}
          open={isOpen}
          id={props.roomId}
        />
      )}
    </Box>
  );
}

function RatingMessage(props: IReview) {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: "#f5f5f5",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box display={"flex"} flexDirection={"row"} sx={{ mb: 2 }}>
        <Avatar
          alt={props.user.username}
          src={props.user.avatar || ""}
          sx={{ width: 56, height: 56 }}
        />
        <Box marginLeft={2}>
          <Typography variant="h6" color="textPrimary">
            {props.user.username}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {new Intl.DateTimeFormat("vi-VN", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }).format(new Date(props.createdAt))}
          </Typography>
        </Box>
      </Box>
      <Rating
        name="read-only"
        value={props.star}
        readOnly
        precision={0.1}
        sx={{ marginBottom: 1 }}
      />
      <Divider light />
      <Box marginTop={2}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          {props.content}
        </Typography>
        <Grid container spacing={2}>
          {props.reviewImages.map((image) => (
            <Grid item sm={4} key={image.id}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                }}
                src={
                  image.imageUrl
                    ? import.meta.env.VITE_BACKEND_URL + image.imageUrl
                    : "https://i.ibb.co/6WXYg60/cafe.jpg"
                }
                alt="Review Image"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
