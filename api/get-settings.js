import { db } from './firebase-config.js';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const docRef = doc(db, "settings", "pendaftaran");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return res.status(200).json(docSnap.data());
    } else {
      return res.status(200).json({ status: "Tutup" });
    }
  } catch (error) {
    console.error("Error get-settings:", error);
    return res.status(500).json({ error: error.message });
  }
}
