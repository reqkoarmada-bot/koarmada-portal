export default async function handler(req, res) {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAMYa0AF2_aH8N93fR22YIa9Kg0AGjKrLI",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "portal-koarmada-92e19.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "portal-koarmada-92e19",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "portal-koarmada-92e19.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "966060677941",
    appId: process.env.FIREBASE_APP_ID || "1:966060677941:web:cd6074b5d8e2b3b9edca7c"
  };

  return res.status(200).json(firebaseConfig);
}
