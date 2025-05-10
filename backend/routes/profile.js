import express from 'express';
import { query } from '../db.js';

const router = express.Router();

router.put('/profile/update', async (req, res) => {
  const { email, name, provider, aboutme } = req.body;

  try {
    // Cập nhật bảng users
    await query('UPDATE users SET name = ?, email = ?, auth_provider = ? WHERE email = ?', [
      name, email, provider, email,
    ]);

    // Cập nhật bảng user_profiles
    await query('UPDATE user_profiles SET about_me = ? WHERE user_id = (SELECT id FROM users WHERE email = ?)', [
      aboutme, email,
    ]);

    res.json({ success: true, message: 'Profile updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật hồ sơ.' });
  }
});

export default router;