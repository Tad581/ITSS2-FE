import React from 'react';
import { Box, TextField } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';

interface DateRangePickerComponentProps {
  dateRange: DateRange<dayjs.Dayjs>;
  setDateRange: (newValue: DateRange<dayjs.Dayjs>) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerComponentProps> = ({ dateRange, setDateRange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mb: 3 }}>
        <DateRangePicker
          startText="Start Date"
          endText="End Date"
          value={dateRange}
          onChange={(newValue) => setDateRange(newValue)}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </>
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePickerComponent;
