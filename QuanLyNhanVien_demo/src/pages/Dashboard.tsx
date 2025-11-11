import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  People,
  Work,
  AttachMoney,
  TrendingUp,
} from '@mui/icons-material';

interface Stat {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const Dashboard = () => {
  const stats: Stat[] = [
    {
      title: 'Tổng Nhân Viên',
      value: '150',
      icon: <People sx={{ fontSize: 40, color: '#1976d2' }} />,
    },
    {
      title: 'Đang Làm Việc',
      value: '142',
      icon: <Work sx={{ fontSize: 40, color: '#2e7d32' }} />,
    },
    {
      title: 'Tổng Chi Lương',
      value: '650,000,000 VNĐ',
      icon: <AttachMoney sx={{ fontSize: 40, color: '#ed6c02' }} />,
    },
    {
      title: 'Overtime (Giờ)',
      value: '245',
      icon: <TrendingUp sx={{ fontSize: 40, color: '#9c27b0' }} />,
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {stats.map((stat) => (
          <Paper
            key={stat.title}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {stat.icon}
              <Typography component="p" variant="h4">
                {stat.value}
              </Typography>
            </Box>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              {stat.title}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thao Tác Nhanh
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{ mr: 2, mb: 2 }}
                  startIcon={<People />}
                >
                  Thêm Nhân Viên
                </Button>
                <Button
                  variant="contained"
                  sx={{ mr: 2, mb: 2 }}
                  startIcon={<AttachMoney />}
                >
                  Tính Lương
                </Button>
                <Button variant="contained" sx={{ mb: 2 }} startIcon={<Work />}>
                  Import Chấm Công
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông Báo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 5 nhân viên chưa chấm công hôm nay
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Kỳ lương tháng 11 sẽ kết thúc trong 3 ngày
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;