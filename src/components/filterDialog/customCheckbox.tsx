import { Box, Typography } from '@mui/material';

interface IProps {
  icon: React.ReactNode;
  title: string;
  backgroundColor: string;
  color: string;
  // handleAction: (params: string | number) => void;
  // params: string | number;
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
        paddingY: 1,
        cursor: 'pointer',
        backgroundColor: props.backgroundColor,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: props.color,
        height: 50,
      }}
    >
      {props.icon}
      <Typography
        component='p'
        sx={{
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '30.26px',
          color: props.color,
        }}
      >
        {props.title}
      </Typography>
    </Box>
  );
}
