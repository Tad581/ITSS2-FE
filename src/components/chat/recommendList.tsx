import { Box } from '@mui/material';
import Recommend from './recommend';

const recommendMessage = [
  'Anh chị có onl k ạ?',
  'Thời hạn thuê tối đa là bao lâu',
  'Các bạn nhân viên ơi hỗ trợ mình với',
  'Alo',
  'Các bạn nhân viên ơi hỗ trợ mình với',
];

export default function RecommendList() {
  return (
    <Box
      sx={{
        width: '800px',
        minWidth: '100%',
        height: '50px',
        paddingTop: 1,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        backgroundColor: '#fff',
        '&::-webkit-scrollbar': {
          height: '5px',
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: ' inset 0 0 6px rgba(0, 0, 0, 0.3)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'darkgrey',
          outline: '1px solid slategrey',
        },

      }}
    >
      {recommendMessage.map((message, index) => {
        return <Recommend message={message} key={index} />;
      })}
    </Box>
  );
}
