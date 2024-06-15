import { Box, Typography } from "@mui/material";
import Star from "@mui/icons-material/Star";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Link from "@mui/material/Link";
import { IReview } from "../../interfaces/room";
import { useMemo } from "react";

interface IProps {
  id: string;
  name: string;
  roomImages: string;
  area: number;
  address: string;
  reviews: IReview[];
  tag: string;
  price: string;
}

export default function CardItem(props: IProps) {
  const { rating, reviewCount }: { rating: number; reviewCount: number } =
    useMemo(() => {
      let totalRating = 0;
      if (props?.reviews)
        props.reviews.forEach((data) => (totalRating += data.star));
      return {
        rating: props.reviews ? totalRating / props.reviews.length : 0,
        reviewCount: props.reviews ? props.reviews.length : 0,
      };
    }, [props.reviews]);

  const tagColor =
    props.tag === "Empty" ? "green" : props.tag === "Full" ? "red" : "grey";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: "1px solid gray",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <Link href={"/detail/" + props.id} sx={{ textDecoration: "none" }}>
        <Box
          component="img"
          src={
            props.roomImages
              ? import.meta.env.VITE_BACKEND_URL + props.roomImages
              : "https://do84cgvgcm805.cloudfront.net/article/362/1200/25cf654358d7812a07902fa42f249dedbec8eb058bdda541c88b9e3b317a93d9.jpg"
          }
          sx={{
            objectFit: "cover",
            borderRadius: 2,
            width: "100%",
            aspectRatio: "1 / 1",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 15,
            left: 15,
            backgroundColor: tagColor,
            color: "#fff",
            padding: "5px 8px",
            borderRadius: "4px",
          }}
        >
          {props.tag === "Empty" ? "Còn phòng" : props.tag === "Full" ? "Hết phòng" : ""}
        </Box>
      </Link>
      <Box sx={{ width: "100%" }}>
        <Link href={"/detail/" + props.id} sx={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: 700,
              marginY: 1,
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "#000",
            }}
          >
            {props.name}
          </Typography>
        </Link>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
          }}
        >
          {Intl.NumberFormat("vi-VN").format(parseInt(props.price)) + " VNĐ"}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
          }}
        >
          {props.area} m²
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <LocationOnOutlinedIcon sx={{ marginRight: 1, fontSize: "16px" }} />
          {props.address}
        </Typography>
        <Typography variant="subtitle1" component="span" marginRight={4}>
          <Star sx={{ color: "yellow", fontSize: 16 }}></Star>
          {!Number.isNaN(rating) ? rating.toFixed(1) : " Chưa có đánh giá"}{" "}
          {reviewCount === 0 ? "" : "(" + reviewCount + " đánh giá)"}
        </Typography>
      </Box>
    </Box>
  );
}
