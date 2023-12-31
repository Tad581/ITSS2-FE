import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
interface IProps {
  handleKeyword?: (keyword: string) => void;
  displayButton?: boolean;
  onButtonClick?: () => void;
}

export default function Header(props: IProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser }: any = useContext(AuthContext);

  const [keyword, setKeyword] = useState<string>('');

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        width: '100%',
        borderBottom: 1,
        borderColor: 'gray',
      }}
    >
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
        <Link href='/'>
          <Box
            component='img'
            sx={{
              maxHeight: 45,
              maxWidth: 100,
              marginRight: 5,
              objectFit: 'cover',
              cursor: 'pointer',
            }}
            alt='logo'
            src='/logo.png'
          />
        </Link>
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
                      props.handleKeyword
                        ? props.handleKeyword(keyword)
                        : console.log(keyword);
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
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Link href='/chat' sx={{color: '#000'}}>
            <ChatOutlinedIcon sx={{ height: 40, width: 40, marginRight: 2 }} />
          </Link>
          {props.displayButton ? (
            <Button
              variant='contained'
              sx={{
                marginRight: 2,
                backgroundColor: '#21b6ae',
                textTransform: 'none',
                borderRadius: 2,
              }}
              onClick={props.onButtonClick}
            >
              Đăng tin
            </Button>
          ) : (
            <></>
          )}
          {
            currentUser ? <Link href='/created-rooms'>
            <Avatar alt='avatar' src={currentUser.photoURL} sx={{ cursor: 'pointer' }} />
          </Link> : <></>
          }

        </Box>
      </Box>
    </Box>
  );
}
