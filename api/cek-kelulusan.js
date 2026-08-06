import { db } from './firebase-config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { nama } = req.body;
  if (!nama) {
    return res.status(400).json({ message: 'Nama harus diisi' });
  }

  try {
    const q = query(collection(db, "kelulusan"), where("nama", "==", nama));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      let data;
      snapshot.forEach(docSnap => {
        data = docSnap.data();
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
