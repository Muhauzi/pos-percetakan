import { NextResponse } from 'next/server';
import { getGoogleSheets } from '@/lib/googleSheets';

export async function GET() {
  try {
    const sheets = await getGoogleSheets();
    
    // Ambil data dari Penjualan dan Pesanan secara paralel
    const [resPenjualan, resPesanan] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'penjualan!A:H',
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'pesanan!A:J',
      })
    ]);

    const salesRows = resPenjualan.data.values || [];
    const orderRows = resPesanan.data.values || [];

    // 1. Hitung Total Omset & Transaksi (dari sheet Penjualan)
    let totalOmset = 0;
    let totalTransaksi = 0;
    if (salesRows.length > 1) {
      totalTransaksi = salesRows.length - 1;
      salesRows.slice(1).forEach(row => {
        totalOmset += parseInt(row[6] || 0); // Kolom G (index 6) adalah total_harga
      });
    }

    // 2. Hitung Pesanan Aktif (dari sheet Pesanan - status bukan 'Selesai')
    let pesananAktif = 0;
    if (orderRows.length > 1) {
      orderRows.slice(1).forEach(row => {
        if (row[9] !== 'Selesai') pesananAktif++; // Kolom J (index 9) adalah status
      });
    }

    return NextResponse.json({
      totalOmset,
      totalTransaksi,
      pesananAktif,
      recentSales: salesRows.slice(-5).reverse() // Ambil 5 transaksi terakhir
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}