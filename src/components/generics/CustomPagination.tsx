import { ThemeProvider } from '@mui/material/styles';
import { Theme } from '../../util/Theme';
import MenuItem from '@mui/material/MenuItem';
import { Box, Pagination } from '@mui/material';
import Select from '@mui/material/Select';

export interface ICustomPaginationProps {
  selectValue?: any;
  selectOnChange?: any;
  totalPages?: any;
  paginateClick?: any;
  currentPage?: number;
}

export default function CustomPagination(props: ICustomPaginationProps) {
  return (
    <ThemeProvider theme={Theme}>
      <Box
        display='flex'
        padding={2}
        justifyContent='flex-end'
      >
        <Select
          size='small'
          sx={{
            '.MuiOutlinedInput-notchedOutline': { border: 0 },
            backgroundColor: 'white',
            mr: 2,
          }}
          value={props.selectValue}
          color='secondary'
          onChange={props.selectOnChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        <Pagination
          size='large'
          count={props.totalPages}
          page={props.currentPage}
          onChange={props.paginateClick}
          shape='rounded'
          color='secondary'
          sx={{ button: { color: '#4DA02B', fontWeight: 'bold' } }}
        />
      </Box>
    </ThemeProvider>
  );
}
