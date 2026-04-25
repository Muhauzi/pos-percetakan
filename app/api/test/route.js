// app/api/test/route.js
import { NextResponse } from 'next/server';
import { getGoogleSheets } from '@/lib/googleSheets';

export async function GET() {
  try {
    const sheets = await getGoogleSheets();
    const range = 'penjualan!A:B'; // Pastikan nama sheet di Google Sheets adalah "penjualan" (kecil semua)

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [["TEST_ID", "Koneksi Berhasil pada " + new Date().toLocaleString()]],
      },
    });

    return NextResponse.json({ message: "✅ Berhasil menulis ke Google Sheets!" });
  } catch (error) {
    return NextResponse.json({ 
      message: "❌ Gagal!", 
      error: error.message,
      detail: "Pastikan nama sheet di tab bawah Google Sheets adalah 'penjualan' dan Service Account sudah jadi Editor."
    }, { status: 500 });
  }
}