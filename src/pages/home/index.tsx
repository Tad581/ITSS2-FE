import { Box } from '@mui/material';
import Filterbar from '../../layout/filterbar';
import Header from '../../layout/header';
import ItemPagination from '../../components/paginationItem';

export default function Home() {
  return (
    <Box sx={{ height: '100vh', width: '100%', backgroundColor: '#F5F5F5' }}>
      <Header />
      <Filterbar />
      <ItemPagination />
    </Box>
  );
}
