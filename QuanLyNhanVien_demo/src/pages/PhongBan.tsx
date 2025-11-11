import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

interface PhongBan {
  ma_phong: string;
  ten_phong: string;
  nam_thanh_lap: number;
  trang_thai: 'HoatDong' | 'NgungHoatDong';
}

const PhongBanPage = () => {
  const [phongBans, setPhongBans] = useState<PhongBan[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PhongBan>({
    ma_phong: '',
    ten_phong: '',
    nam_thanh_lap: new Date().getFullYear(),
    trang_thai: 'HoatDong',
  });

  useEffect(() => {
    fetchPhongBans();
  }, []);

  const fetchPhongBans = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/phong-ban');
      setPhongBans(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/api/v1/phong-ban/${formData.ma_phong}`,
          formData
        );
      } else {
        await axios.post('http://localhost:3000/api/v1/phong-ban', formData);
      }
      fetchPhongBans();
      handleClose();
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  const handleEdit = (phongBan: PhongBan) => {
    setFormData(phongBan);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async (ma_phong: string) => {
    if (window.confirm('Bạn có chắc muốn xóa phòng ban này?')) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/phong-ban/${ma_phong}`);
        fetchPhongBans();
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setIsEditing(false);
    setFormData({
      ma_phong: '',
      ten_phong: '',
      nam_thanh_lap: new Date().getFullYear(),
      trang_thai: 'HoatDong',
    });
  };

  const columns: GridColDef[] = [
    { field: 'ma_phong', headerName: 'Mã Phòng', width: 130 },
    { field: 'ten_phong', headerName: 'Tên Phòng', width: 300 },
    { field: 'nam_thanh_lap', headerName: 'Năm Thành Lập', width: 150 },
    { field: 'trang_thai', headerName: 'Trạng Thái', width: 150 },
    {
      field: 'actions',
      headerName: 'Thao Tác',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row)}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.ma_phong)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Quản Lý Phòng Ban</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Thêm Phòng Ban
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataGrid
          rows={phongBans}
          columns={columns}
          getRowId={(row) => row.ma_phong}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {isEditing ? 'Sửa Phòng Ban' : 'Thêm Phòng Ban Mới'}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Mã Phòng"
              fullWidth
              required
              value={formData.ma_phong}
              onChange={(e) =>
                setFormData({ ...formData, ma_phong: e.target.value })
              }
              disabled={isEditing}
            />
            <TextField
              margin="dense"
              label="Tên Phòng"
              fullWidth
              required
              value={formData.ten_phong}
              onChange={(e) =>
                setFormData({ ...formData, ten_phong: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Năm Thành Lập"
              type="number"
              fullWidth
              value={formData.nam_thanh_lap}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nam_thanh_lap: parseInt(e.target.value),
                })
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Trạng Thái</InputLabel>
              <Select
                value={formData.trang_thai}
                label="Trạng Thái"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    trang_thai: e.target.value as 'HoatDong' | 'NgungHoatDong',
                  })
                }
              >
                <MenuItem value="HoatDong">Hoạt Động</MenuItem>
                <MenuItem value="NgungHoatDong">Ngừng Hoạt Động</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="submit" variant="contained">
              {isEditing ? 'Cập Nhật' : 'Thêm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default PhongBanPage;