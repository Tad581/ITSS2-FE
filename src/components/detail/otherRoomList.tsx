import { Box, Card, Typography } from "@mui/material";


type OtherRoomListProps = {
	roomList: RoomCardProps[];
}

export default function OtherRoomList(props: OtherRoomListProps) {
	const { roomList } = props

	return (
		<Box
			sx={{
				display: 'flex',
				gap: 1,
				py: 1,
				overflow: 'auto',
				width: 1000,
				scrollSnapType: 'x mandatory',
				'& > *': {
					scrollSnapAlign: 'center',
				},
				'::-webkit-scrollbar': { display: 'none' },
			}}
		>
			{
				roomList.map((room, index) => {
					return (
						<RoomCard key={index} {...room}></RoomCard>
					)
				})
			}
		</Box>
	)
}

OtherRoomList.defaultProps = {
	roomList: [
		{
			description: "Chung cư mini cao cấp tại Hà Nội, gần khu vực Bách Kinh Xây",
			distance: "1km"
		},
		{
			description: "Chung cư mini cao cấp tại Hà Nội, gần khu vực Bách Kinh Xây",
			distance: "300m"
		},
		{
			description: "Chung cư mini cao cấp tại Hà Nội, gần khu vực Bách Kinh Xây",
			distance: "300m"
		},
		{
			description: "Chung cư mini cao cấp tại Hà Nội, gần khu vực Bách Kinh Xây",
			distance: "300m"
		},
		{
			description: "Chung cư mini cao cấp tại Hà Nội, gần khu vực Bách Kinh Xây",
			distance: "300m"
		},
		{
			description: "Chung cư mini cao cấp tại Hà Nội, gần khu vực Bách Kinh Xây",
			distance: "300m"
		},
		{
			description: "Chung cư mini cao cấp tại Hà Nội, gần khu vực Bách Kinh Xây",
			distance: "300m"
		},
	]
}

type RoomCardProps = {
	description: string;
	distance: string;
}

function RoomCard(props: RoomCardProps) {
	const { description, distance } = props

	return (
		<Card
			variant="outlined"
			sx={{ minWidth: 300, width: 300, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 2, border: 'none' }}>
			<Box
				component="img"
				sx={{
					height: 300,
					width: 300,
					marginBottom: 1
				}}
				alt="The house from the offer."
				src="https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg"
			/>
			<div>
				<Typography variant="body2">{description}</Typography>
				<Typography variant="subtitle1">Cách ĐHBKHN {distance}</Typography>
			</div>
		</Card>
	)
}

RoomCard.defaultProps = {
	description: "Chung cư mini cao cấp tại Hà Nội, gần khu vực Bách Kinh Xây",
	distance: "Cách ĐHBKHN 300m"
}
