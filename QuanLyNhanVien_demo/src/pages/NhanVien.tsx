import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface NhanVienItem {
  ma_nhan_vien: string;
  ten_nhan_vien: string;
  ma_phong: string;
  ma_chuc_vu: string;
  muc_luong_co_ban: number;
}

const NhanVienPage: React.FC = () => {
  const [items, setItems] = useState<NhanVienItem[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<NhanVienItem>({ ma_nhan_vien: '', ten_nhan_vien: '', ma_phong: '', ma_chuc_vu: '', muc_luong_co_ban: 0 });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/nhan-vien');
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching nhan vien', error);
      alert('Không thể lấy danh sách nhân viên');
    }
  };

  const columns: GridColDef[] = [
    { field: 'ma_nhan_vien', headerName: 'Mã NV', width: 150 },
    { field: 'ten_nhan_vien', headerName: 'Tên NV', width: 250 },
    { field: 'ma_phong', headerName: 'Phòng', width: 120 },
    { field: 'ma_chuc_vu', headerName: 'Chức vụ', width: 120 },
    { field: 'muc_luong_co_ban', headerName: 'Lương cơ bản', width: 150 },
    { field: 'actions', headerName: 'Thao tác', width: 160, renderCell: (params) => (
      <>
        <Button size="small" onClick={() => { setForm(params.row); setOpen(true); }} startIcon={<EditIcon/>}>Sửa</Button>
        <Button size="small" color="error" onClick={() => handleDelete(params.row.ma_nhan_vien)} startIcon={<DeleteIcon/>}>Xóa</Button>
      </>
    )}
  ];

  const handleSubmit = async () => {
    try {
      if (form.ma_nhan_vien) {
        // update
        await axios.put(`http://localhost:3000/api/v1/nhan-vien/${form.ma_nhan_vien}`, form);
      } else {
        // create
        await axios.post('http://localhost:3000/api/v1/nhan-vien', form);
      }
      await fetchItems();
      setOpen(false);
    } catch (error) {
      console.error('Error saving nhan vien', error);
      alert('Lỗi khi lưu nhân viên');
    }
  };

  const handleDelete = async (ma_nhan_vien: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa nhân viên này?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/v1/nhan-vien/${ma_nhan_vien}`);
      await fetchItems();
    } catch (error) {
      console.error('Error deleting nhan vien', error);
      alert('Lỗi khi xóa nhân viên');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Quản lý Nhân Viên</Typography>
        <Button variant="contained" startIcon={<AddIcon/>} onClick={() => { setForm({ ma_nhan_vien: '', ten_nhan_vien: '', ma_phong: '', ma_chuc_vu: '', muc_luong_co_ban: 0 }); setOpen(true); }}>Thêm NV</Button>
      </Box>

      <Paper sx={{ width: '100%', height: 500 }}>
        <DataGrid rows={items} columns={columns} getRowId={(row) => row.ma_nhan_vien} />
      </Paper>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Thêm / Sửa Nhân Viên</DialogTitle>
        <form onSubmit={async (e) => { e.preventDefault(); await handleSubmit(); }}>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Tên nhân viên" value={form.ten_nhan_vien} onChange={e=>setForm({...form, ten_nhan_vien: e.target.value})} required />
          <TextField fullWidth margin="dense" label="Mã phòng (3 ký tự)" value={form.ma_phong} onChange={e=>setForm({...form, ma_phong: e.target.value.toUpperCase()})} required inputProps={{ maxLength: 3 }} />
          <TextField fullWidth margin="dense" label="Mã chức vụ (1 ký tự)" value={form.ma_chuc_vu} onChange={e=>setForm({...form, ma_chuc_vu: e.target.value.toUpperCase()})} required inputProps={{ maxLength: 1 }} />
          <TextField fullWidth margin="dense" label="Lương cơ bản" type="number" value={form.muc_luong_co_ban} onChange={e=>setForm({...form, muc_luong_co_ban: Number(e.target.value)})} required />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button type="submit" variant="contained">Lưu</Button>
        </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default NhanVienPage;
