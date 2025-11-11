import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const CaiDatPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>Cài Đặt</Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          <ListItem>
            <ListItemText primary="Quản lý người dùng" secondary="Thêm/xóa/sửa tài khoản" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Cấu hình hệ thống" secondary="Timezone, currency, payroll rules" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default CaiDatPage;
