import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

const BaoCaoPage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Báo Cáo</Typography>
        <Button variant="contained">Xuất CSV</Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography>Chọn năm/tháng và scope để xem báo cáo.</Typography>
        {/* TODO: implement filters and data table */}
      </Paper>
    </Box>
  );
};

export default BaoCaoPage;
