import { Avatar, Box, Button, Divider, Typography } from "@mui/material";


type RoomInfoGridProps = {
  name: string;
  avatar: string;
  role: string;
  messages: string[];
}

export default function RoomOwnerContact(props: RoomInfoGridProps) {
  const { name, avatar, role, messages } = props

  return (<Box sx={{ maxWidth: 360 }}>
    <Box sx={{ border: 1, padding: 2, borderRadius: 4 }}>
      <Box display={"flex"} flexDirection={"row"}>
        <Avatar
          alt={name}
          src={avatar}
          sx={{ width: 56, height: 56 }}
        />
        <Box marginLeft={2}>
          <Typography variant="h6" color="blue">{name}</Typography>
          <Typography variant="subtitle1">{role}</Typography>
        </Box>
      </Box>
      <Divider light />
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} marginTop={2}>
        {
          messages.map((message, index) => {
            return (
              <Button key={index} variant="contained" color="inherit" sx={{ maxHeight: '30px', borderRadius: 100, margin: 1 }}>{message}</Button>
            )
          })
        }
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Button variant="contained" color="success" sx={{ borderRadius: 2, margin: 1 }}>Chat với người bán</Button>
      </Box>
    </Box>
  </Box>)
}

RoomOwnerContact.defaultProps = {
  name: "Duy Trọng",
  avatar: "/static/images/avatar/1.jpg",
  role: "Môi giới",
  messages: ["Anh chị có onl k ạ?", "Thời hạn thuê tối đa là bao lâu"]
}