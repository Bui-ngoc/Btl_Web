import TaiKhoan from '../models/TaiKhoan';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await TaiKhoan.findOne({ where: { username, password } });

    if (!user) {
      return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    return res.status(200).json({ message: 'Đăng nhập thành công', user });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server', error });
  }
};