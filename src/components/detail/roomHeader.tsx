import { Avatar, Box, Button, Card, Container, Divider, Grid, ImageList, ImageListItem, Rating, Typography } from "@mui/material";
import Star from '@mui/icons-material/Star';

type RoomHeaderProps = {
	title: string;
	rating: number;
	reviewCount: number;
	location: string;
}

export default function RoomHeader(props: RoomHeaderProps) {
	const { title, rating, reviewCount, location } = props
	return (
		<>
			<Typography variant="h4" component="h4">
				{title}
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "row" }}>
				<Typography variant="subtitle1" component="span" marginRight={4}>
					<Star sx={{ color: "yellow", fontSize: 16 }} ></Star>
					{rating.toFixed(1)} ({reviewCount} đánh giá)
				</Typography>
				<Typography variant="subtitle1" component="span">
					{location}
				</Typography>
			</Box>
		</>
	)
}

RoomHeader.defaultProps = {
	title: "Charm M1.2, Flamingo Đà lạt",
	rating: 5.0,
	reviewCount: 25,
	location: "Thanh Xuân, Hà Nội"
}