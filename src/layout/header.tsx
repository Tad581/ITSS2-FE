import { Box, TextField, InputAdornment, Button, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { useState } from 'react';

interface IProps {
  handleKeyword: (keyword: string) => void;
}

export default function Header(props: IProps) {
  const [keyword, setKeyword] = useState<string>('');

  return (
    <Box sx={{ backgroundColor: '#fff', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          paddingX: 4,
          paddingY: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          component='img'
          sx={{
            maxHeight: 45,
            maxWidth: 100,
            marginRight: 5,
            objectFit: 'cover',
          }}
          alt='logo'
          src='/logo.png'
        />
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            sx={{ width: '100%', height: 40 }}
            variant='outlined'
            size='small'
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setKeyword(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      props.handleKeyword(keyword);
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            maxWidth: 230,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <ChatOutlinedIcon sx={{ height: 40, width: 40, marginRight: 2 }} />
          <Button
            variant='contained'
            sx={{
              marginRight: 2,
              backgroundColor: '#21b6ae',
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            Đăng tin
          </Button>
          <Avatar alt='avatar' src='/avatar.png' />
        </Box>
      </Box>
    </Box>
  );
}
