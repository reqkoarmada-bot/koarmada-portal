const { db } = require('./firebase-admin');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const docSnap = await db.collection("settings").doc("pendaftaran").get();
    
    if (docSnap.exists) {
      return res.status(200).json(docSnap.data());
    } else {
      return res.status(200).json({ status: "Tutup" }); // Default
    }
  } catch (error) {
    console.error("Error get-settings:", error);
    return res.status(500).json({ error: error.message });
  }
}
