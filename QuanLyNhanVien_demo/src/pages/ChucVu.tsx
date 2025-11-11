import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface ChucVuItem {
  ma_chuc_vu: string;
  ten_chuc_vu: string;
}

const ChucVuPage: React.FC = () => {
  const [items, setItems] = useState<ChucVuItem[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ChucVuItem>({ ma_chuc_vu: '', ten_chuc_vu: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/chuc-vu');
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching chuc vu', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/v1/chuc-vu/${form.ma_chuc_vu}`, form);
      } else {
        await axios.post('http://localhost:3000/api/v1/chuc-vu', form);
      }
      await fetchItems();
      setOpen(false);
    } catch (error: any) {
      console.error('Error saving chuc vu', error);
      alert(error.response?.data?.message || 'Lỗi khi lưu chức vụ');
    }
  };

  const handleDelete = async (ma_chuc_vu: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/chuc-vu/${ma_chuc_vu}`);
      await fetchItems();
    } catch (error) {
      console.error('Error deleting chuc vu', error);
      alert('Lỗi khi xóa');
    }
  };

  const columns: GridColDef[] = [
    { field: 'ma_chuc_vu', headerName: 'Mã', width: 100 },
    { field: 'ten_chuc_vu', headerName: 'Tên chức vụ', width: 300 },
    { field: 'actions', headerName: 'Thao tác', width: 150, renderCell: (params) => (
      <>
        <Button size="small" onClick={() => { setForm(params.row); setIsEditing(true); setOpen(true); }} startIcon={<EditIcon/>}>Sửa</Button>
        <Button size="small" color="error" onClick={() => { if(window.confirm('Xóa chức vụ?')){ handleDelete(params.row.ma_chuc_vu); } }} startIcon={<DeleteIcon/>}>Xóa</Button>
      </>
    )}
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Quản lý Chức Vụ</Typography>
        <Button variant="contained" startIcon={<AddIcon/>} onClick={() => { setForm({ ma_chuc_vu: '', ten_chuc_vu: '' }); setIsEditing(false); setOpen(true); }}>Thêm</Button>
      </Box>

      <Paper sx={{ width: '100%', height: 400 }}>
        <DataGrid rows={items} columns={columns} getRowId={(row) => row.ma_chuc_vu} />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isEditing ? 'Sửa chức vụ' : 'Thêm chức vụ'}</DialogTitle>
        <form onSubmit={async (e) => { e.preventDefault(); await handleSubmit(); }}>
          <DialogContent>
            <TextField fullWidth margin="dense" label="Mã chức vụ" value={form.ma_chuc_vu} onChange={e => setForm({...form, ma_chuc_vu: e.target.value })} disabled={isEditing} required />
            <TextField fullWidth margin="dense" label="Tên chức vụ" value={form.ten_chuc_vu} onChange={e => setForm({...form, ten_chuc_vu: e.target.value })} required />
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

export default ChucVuPage;
