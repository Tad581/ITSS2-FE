import { Box } from '@mui/material';
import Header from '../../layout/header';
import ItemPagination from '../../components/paginationItem';

export default function Home() {
  return (
    <Box sx={{ height: 'auto', width: '100%', backgroundColor: '#F5F5F5' }}>
      <Header />
      <ItemPagination />
    </Box>
  );
}
