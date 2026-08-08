export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { password } = req.body || {};

  // Memeriksa password dari ADMIN_PASSWORD_BERITA di Vercel
  if (password && password === process.env.ADMIN_PASSWORD_BERITA) {
    return res.status(200).json({ 
      success: true, 
      message: 'Login berhasil!' 
    });
  } else {
    return res.status(401).json({ 
      success: false, 
      message: 'Password salah, akses ditolak!' 
    });
  }
}

