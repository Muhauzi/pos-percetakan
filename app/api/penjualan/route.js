import { NextResponse } from 'next/server';
import { getGoogleSheets } from '@/lib/googleSheets';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// GET: Ambil semua data penjualan untuk Riwayat & Dashboard
export async function GET() {
  try {
    const sheets = await getGoogleSheets();
    const res = await sheets.spreadsheets.values.get({ 
      spreadsheetId: SPREADSHEET_ID, 
      range: 'penjualan!A:I' 
    });
    const rows = res.data.values || [];
    // Mapping sesuai struktur kolom baru [A-I]
    const data = rows.slice(1).map(r => ({
      tanggal: r[0],
      id_penjualan: r[1],
      pelanggan: r[2],
      id_kategori: r[3],
      nama_kategori: r[4] || "...", // Nama dari rumus Sheets
      deskripsi: r[5],
      qty: r[6],
      total: r[7],
      metode: r[8]
    }));
    // Balik urutan agar data terbaru ada di atas
    return NextResponse.json({ data: data.reverse() });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST: Simpan transaksi baru dari Kasir
export async function POST(req) {
  try {
    const b = await req.json();
    const sheets = await getGoogleSheets();
    
    const tanggal = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    const idTrx = `INV-${Date.now()}`;

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID, 
      range: 'penjualan!A:I', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          tanggal,      // A
          idTrx,        // B
          b.pelanggan,  // C
          b.id_kategori,// D
          "",           // E (Dikosongkan agar Rumus Sheets bekerja)
          b.deskripsi,  // F
          b.qty,        // G
          b.total,      // H
          b.metode      // I
        ]]
      }
    });
    return NextResponse.json({ success: true, message: "Transaksi Berhasil!" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE: Hapus transaksi (Opsional, jika ada salah input di riwayat)
export async function DELETE(req) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const sheets = await getGoogleSheets();
    const res = await sheets.spreadsheets.values.get({ 
      spreadsheetId: SPREADSHEET_ID, 
      range: 'penjualan!B:B' 
    });
    const rows = res.data.values || [];
    const idx = rows.findIndex(r => r[0] === id);

    if (idx === -1) throw new Error("Transaksi tidak ditemukan");

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{
          deleteDimension: {
            range: {
              sheetId: 1821802203, // GANTI dengan GID tab 'penjualan' Anda
              dimension: "ROWS",
              startIndex: idx,
              endIndex: idx + 1
            }
          }
        }]
      }
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}