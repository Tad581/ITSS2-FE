import { Box } from '@mui/material';
import Header from '../../layout/header';
import ItemPagination from '../../components/paginationItem/searchPagination';

export default function Home() {
  return (
    <Box
      sx={{
        height: 'auto',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#F5F5F5',
      }}
    >
      <Header />
      <ItemPagination />
    </Box>
  );
}
