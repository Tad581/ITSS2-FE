import { Box, Typography } from '@mui/material';

interface IProps {
  icon: React.ReactNode;
  title: string;
  backgroundColor: string;
  color: string;
  fontSize: string;
  fontWeight: string;
  height: number;
  borderRadius?: number;
  borderStyle?: string;
  borderWidth?: number;
  paddingX? : number;
  paddingY? : number;
}

export default function CustomCheckbox(props: Readonly<IProps>) {
  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        borderWidth: props.borderWidth,
        borderStyle: props.borderStyle,
        borderColor: props.color,
        height: props.height,
        paddingX: props.paddingX,
        paddingY: props.paddingY,
      }}
    >
      {props.icon}
      <Typography
        component='p'
        sx={{
          fontWeight: props.fontWeight,
          fontSize: props.fontSize,
          color: props.color,
        }}
      >
        {props.title}
      </Typography>
    </Box>
  );
}
