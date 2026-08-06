const { db } = require('./firebase-admin');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { nama, unit, roblox, alasan } = req.body;

  try {
    // 1. Simpan ke Firestore via Admin SDK
    await db.collection("pendaftar_masuk").add({
      nama: nama,
      roblox: roblox,
      alasan: alasan,
      unit: unit,
      waktu: new Date()
    });

    // 2. Kirim notifikasi ke Discord
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      const payload = {
        username: "Bot Pendaftaran KOARMADA",
        embeds: [{
          title: "📥 PENDAFTARAN BARU MASUK!",
          color: 20638,
          fields: [
            { name: "👤 Discord Username", value: `\`${nama || '-'}\``, inline: true },
            { name: "🛡️ Pilihan Unit", value: `**${unit || '-'}**`, inline: true },
            { name: "🎮 Link Roblox", value: roblox || '-' },
            { name: "📝 Alasan Mendaftar", value: alasan || '-' }
          ],
          footer: { text: "Portal Pendaftaran KOARMADA • " + new Date().toLocaleString("id-ID") }
        }]
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    return res.status(200).json({ success: true, message: 'Berhasil mendaftar!' });
  } catch (error) {
    console.error("Error kirim form:", error);
    return res.status(500).json({ success: false, message: 'Gagal mengirim pendaftaran.', error: error.message });
  }
}
