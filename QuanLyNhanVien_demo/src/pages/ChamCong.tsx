import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import axios from 'axios';

interface Session {
  id: number;
  ma_nhan_vien: string;
  checkin: string; // ISO
  checkout?: string;
  duration_hours?: number;
}

const ChamCongPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [maNV, setMaNV] = useState<string>('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async (ma_nhan_vien?: string) => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/cham-cong', { params: ma_nhan_vien ? { ma_nhan_vien } : {} });
      setSessions(res.data);
    } catch (error) {
      console.error('Error fetching sessions', error);
    }
  };

  const handleCheckIn = async () => {
    if (!maNV) return alert('Nhập mã nhân viên');
    try {
      await axios.post('http://localhost:3000/api/v1/cham-cong/checkin', { ma_nhan_vien: maNV, checkin: new Date().toISOString() });
      await fetchSessions(maNV);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Lỗi check-in');
    }
  };

  const handleCheckOut = async () => {
    if (!maNV) return alert('Nhập mã nhân viên');
    try {
      await axios.post('http://localhost:3000/api/v1/cham-cong/checkout', { ma_nhan_vien: maNV, checkout: new Date().toISOString() });
      await fetchSessions(maNV);
    } catch (error: any) {
      alert(error.response?.data?.message || 'Lỗi check-out');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Chấm Công</Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField size="small" label="Mã NV" value={maNV} onChange={(e) => setMaNV(e.target.value.toUpperCase())} />
          <Button variant="contained" sx={{ mr: 1 }} onClick={handleCheckIn}>Check-in</Button>
          <Button variant="contained" onClick={handleCheckOut}>Check-out</Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Phiên gần đây</Typography>
        <List>
          {sessions.length === 0 && <ListItem><ListItemText primary="Chưa có phiên nào" /></ListItem>}
          {sessions.map(s => (
            <ListItem key={s.id}>
              <ListItemText primary={`${s.ma_nhan_vien} — ${new Date(s.checkin).toLocaleString()} -> ${s.checkout ? new Date(s.checkout).toLocaleString() : '...'} (${s.duration_hours ?? '-' } h)`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ChamCongPage;
