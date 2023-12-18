import {
  Avatar,
  Box,
  Divider,
  Rating,
  Typography,
  Pagination,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { IReview } from '../../interfaces/room';

interface IProps {
  rating: number;
  reviewCount: number;
  messages?: IReview[];
}

const pageSize = 2;

export default function RatingMessageList(props: IProps) {
  const [showData, setShowData] = useState<IReview[]>([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
    page: 1,
  });

  useEffect(() => {
    if (props.messages) {
      const data: IReview[] = props.messages?.slice(
        pagination.from,
        pagination.to
      );
      setPagination({ ...pagination, count: props.messages.length });
      setShowData(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.messages, pagination.from, pagination.to]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(event);
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to, page: page });
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4' component='h4' sx={{ fontWeight: 600 }}>
          {props.rating.toFixed(1)} /
          <span style={{ fontSize: 16, fontWeight: 400 }}>5.0</span>
          <Rating name='read-only' value={3.5} readOnly sx={{ marginX: 2 }} />
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant='subtitle1' component='span'>
          {props.reviewCount} đánh giá
        </Typography>
      </Box>
      {/* Rating message */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          py: 1,
          width: 'auto',
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
      {!props.messages || props.messages.length < pageSize ? (
        <></>
      ) : (
        <Pagination
          count={Math.ceil(props.messages.length / pageSize)}
          onChange={handlePageChange}
          page={pagination.page}
          sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, marginLeft: -6}}
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
        borderRadius: 4,
        minWidth: 300,
        backgroundColor: '#5AB7FA',
      }}
    >
      <Box display={'flex'} flexDirection={'row'}>
        <Avatar
          alt={props.user.username}
          src={props.user.avatar ? props.user.avatar : ''}
          sx={{ width: 56, height: 56 }}
        />
        <Box marginLeft={2}>
          <Typography variant='h6' color='black'>
            {props.user.username}
          </Typography>
          <Typography variant='subtitle1'>{props.created_at}</Typography>
        </Box>
      </Box>
      <Divider light />
      <Box
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        marginTop={2}
      >
        <Typography variant='subtitle1'>{props.content}</Typography>
      </Box>
    </Box>
  );
}
