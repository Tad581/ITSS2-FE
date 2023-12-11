import { Avatar, Box, Button, Divider, Rating, Typography } from "@mui/material";

type RatingProps = {
  rating: number;
  reviewCount: number;
  messages: RatingMessageProps[];
}

export default function RatingMessageList(props: RatingProps) {
  const { rating, reviewCount, messages } = props
  return (
    <>
    {/* N */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h4" sx={{ fontWeight: 600 }}>
          {rating.toFixed(1)} /<span style={{ fontSize: 16, fontWeight: 400 }}>5.0</span>
          <Rating name="read-only" value={3.5} readOnly sx={{ marginX: 2 }} />
        </Typography>
        <Button variant="text" color="inherit" >
          Đọc tất cả đánh giá
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="subtitle1" component="span">
          {reviewCount} đánh giá
        </Typography>
      </Box>

      {/* Rating message */}
      <Box
              sx={{
                display: 'flex',
                gap: 1,
                py: 1,
                overflow: 'auto',
                width: 600,
                scrollSnapType: 'x mandatory',
                '& > *': {
                  scrollSnapAlign: 'center',
                },
                '::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {
                messages.map((message, index) => {
                  return (
                    <RatingMessage key={index} {...message}/>
                  )
                })
              }
            </Box>
    </>
  )
}

RatingMessageList.defaultProps = {
  rating: 3.5,
  reviewCount: 25,
  messages: [
    {
      name: "Duy Trọng",
      avatar: "/static/images/avatar/1.jpg",
      time: "16:15 05/09/2023",
      message: "Chủ nhà đẹp trai, dễ thương, cảm ơn \"\""
    },
    {
      name: "Duy Trọng",
      avatar: "/static/images/avatar/1.jpg",
      time: "16:15 05/09/2023",
      message: "Chủ nhà đẹp trai, dễ thương, cảm ơn \"\""
    },
    {
      name: "Duy Trọng",
      avatar: "/static/images/avatar/1.jpg",
      time: "16:15 05/09/2023",
      message: "Chủ nhà đẹp trai, dễ thương, cảm ơn \"\""
    },
  ]
}

type RatingMessageProps = {
  name: string;
  avatar: string;
  message: string;
  time: string;
}

function RatingMessage(props: RatingMessageProps) {
  const { name, avatar, message, time } = props

  return (
    <Box sx={{ border: 1, padding: 2, borderRadius: 4, minWidth: 400, }}>
      <Box display={"flex"} flexDirection={"row"}>
        <Avatar
          alt={name}
          src={avatar}
          sx={{ width: 56, height: 56 }}
        />
        <Box marginLeft={2}>
          <Typography variant="h6" color="blue">{name}</Typography>
          <Typography variant="subtitle1">{time}</Typography>
        </Box>
      </Box>
      <Divider light />
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} marginTop={2}>
        <Typography variant="subtitle1">{message}</Typography>
      </Box>
    </Box>
  )
}
