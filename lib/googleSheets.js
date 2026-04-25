// lib/googleSheets.js
import { google } from 'googleapis';

export async function getGoogleSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      // Mengubah string \n dari .env menjadi baris baru (newline) yang sebenarnya
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  return googleSheets;
}