import React, { useMemo } from 'react';
import {Box, Paper, Grid, Typography} from '@mui/material';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import HeatPumpOutlinedIcon from '@mui/icons-material/HeatPumpOutlined';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';


type RoomInfoGridProps = {
  haveWifi: boolean;
  haveHeater: boolean;
  haveAirConditioner: boolean;
  haveFridge: boolean;
  haveWashingMachine: boolean;
  havePCCC: boolean;
}

export default function RoomAttribute(props: RoomInfoGridProps) {
  const { haveWifi, haveHeater, haveAirConditioner, haveFridge, haveWashingMachine, havePCCC } = props;

  const items = useMemo(() => {
    const _items = []
    if (haveWifi) _items.push(<Item key={_items.length} icon={WifiOutlinedIcon}>Wifi</Item>)
    if (haveHeater) _items.push(<Item key={_items.length} icon={WaterDropOutlinedIcon}>Nóng lạnh</Item>)
    if (haveAirConditioner) _items.push(<Item key={_items.length} icon={HeatPumpOutlinedIcon}>Điều hòa</Item>)
    if (haveFridge) _items.push(<Item key={_items.length} icon={KitchenOutlinedIcon}>Tủ lạnh</Item>)
    if (haveWashingMachine) _items.push(<Item key={_items.length} icon={LocalLaundryServiceOutlinedIcon}>Máy giặt</Item>)
    if (havePCCC) _items.push(<Item key={_items.length} icon={WhatshotOutlinedIcon}>PCCC</Item>)
    return _items;
  }, [haveWifi, haveHeater, haveAirConditioner, haveFridge, haveWashingMachine, havePCCC]);

  return (
    <Box sx={{ flexGrow: 1, marginX: 2, marginTop: 2 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 6 }}>
        {/*  */}
        {items}
        {/*  */}
      </Grid>
    </Box>
  )
}

RoomAttribute.defaultProps = {
  haveWifi: true,
  haveHeater: true,
  haveAirConditioner: true,
  haveFridge: true,
  haveWashingMachine: true,
  havePCCC: true,
}

type ItemProps = {
  icon: any;
  children: any;
}

function Item(props: ItemProps) {
  const { icon, children } = props
  const Icon = icon;
  return (
    <Grid item xs={1} sm={2} md={2} pl={2}>
      <Paper
        padding={2}
        sx={{
          textAlign: 'center',
          boxShadow: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Icon sx={{ fontSize: 30, marginRight: 2 }}></Icon>
        <Typography>{children}</Typography>
      </Paper>
    </Grid>
  )
}
