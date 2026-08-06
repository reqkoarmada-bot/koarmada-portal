const { db } = require('./firebase-admin');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { nama } = req.body;
  if (!nama) {
    return res.status(400).json({ message: 'Nama harus diisi' });
  }

  try {
    const snapshot = await db.collection("kelulusan").where("nama", "==", nama).get();
    
    if (!snapshot.empty) {
      let data;
      snapshot.forEach(doc => {
        data = doc.data();
      });
      return res.status(200).json({ lulus: true, unit: data.unit });
    } else {
      return res.status(200).json({ lulus: false });
    }
  } catch (error) {
    console.error("Error cek-kelulusan:", error);
    return res.status(500).json({ error: error.message });
  }
}
