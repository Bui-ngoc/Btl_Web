import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface PayrollRow {
  ma_nhan_vien: string;
  ten_nhan_vien: string;
  tong_gio: number;
  luong_co_ban: number;
  luong_them: number;
  tong_luong: number;
}

const LuongPage: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [scope, setScope] = useState<'company' | 'department'>('company');
  const [rows, setRows] = useState<PayrollRow[]>([]);

  const handlePreview = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/luong/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thang: month, nam: year, scope, ma_phong: scope === 'department' ? '' : undefined }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Preview failed');
      }
      const data = await res.json();
      setRows(data);
    } catch (error: any) {
      alert(error.message || 'Lỗi khi tính thử');
    }
  };

  const handleFinalize = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/luong/finalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thang: month, nam: year, scope, ma_phong: scope === 'department' ? '' : undefined }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Finalize failed');
      }
      const data = await res.json();
      alert(`Finalize OK: ${data.count || 0} records`);
    } catch (error: any) {
      alert(error.message || 'Lỗi khi finalize');
    }
  };

  const columns: GridColDef[] = [
    { field: 'ma_nhan_vien', headerName: 'Mã NV', width: 140 },
    { field: 'ten_nhan_vien', headerName: 'Tên nhân viên', width: 220 },
    { field: 'tong_gio', headerName: 'Tổng giờ', width: 100, type: 'number' },
    { field: 'luong_co_ban', headerName: 'Lương cơ bản', width: 150, type: 'number' },
    { field: 'luong_them', headerName: 'Lương thêm', width: 150, type: 'number' },
    { field: 'tong_luong', headerName: 'Tổng thực nhận', width: 160, type: 'number' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Tính Lương</Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FormControl size="small">
              <InputLabel>Năm</InputLabel>
              <Select value={year} label="Năm" onChange={(e) => setYear(Number(e.target.value))}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <MenuItem key={currentYear - i} value={currentYear - i}>
                    {currentYear - i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl size="small">
              <InputLabel>Tháng</InputLabel>
              <Select value={month} label="Tháng" onChange={(e) => setMonth(Number(e.target.value))}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl size="small">
              <InputLabel>Scope</InputLabel>
              <Select value={scope} label="Scope" onChange={(e) => setScope(e.target.value as any)}>
                <MenuItem value="company">Toàn công ty</MenuItem>
                <MenuItem value="department">Theo phòng</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <Button variant="contained" onClick={handlePreview} sx={{ mr: 1 }}>
              Tính thử (Preview)
            </Button>
            <Button variant="contained" color="success" onClick={handleFinalize}>
              Finalize
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ height: 480, p: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.ma_nhan_vien}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50]}
          autoHeight
        />
      </Paper>
    </Box>
  );
};

export default LuongPage;
