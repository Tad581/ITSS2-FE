import { Box } from '@mui/material';
import Header from '../../layout/header';
import ItemPagination from '../../components/paginationItem/searchPagination';
import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  return (
    <Box
      sx={{
        height: 'auto',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#EEEDEB',
      }}
    >
      <Header handleKeyword={(keyword: string) => setKeyword(keyword)} />
      <ItemPagination keyword={keyword}/>
    </Box>
  );
}
