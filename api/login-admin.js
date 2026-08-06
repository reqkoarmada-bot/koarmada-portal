export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin_koarmada_2026";

  if (password === adminPassword) {
    // Set Secure, HttpOnly, SameSite Cookie
    res.setHeader('Set-Cookie', `admin_session=authenticated; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`);
    return res.status(200).json({ success: true, message: 'Login Admin Berhasil' });
  } else {
    return res.status(401).json({ success: false, message: 'Password Admin Salah!' });
  }
}
