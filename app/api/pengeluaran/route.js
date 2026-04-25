import { NextResponse } from 'next/server';
import { getGoogleSheets } from '@/lib/googleSheets';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function GET() {
  try {
    const sheets = await getGoogleSheets();
    const res = await sheets.spreadsheets.values.get({ 
      spreadsheetId: SPREADSHEET_ID, 
      range: 'pengeluaran!A:E' 
    });
    const rows = res.data.values || [];
    const data = rows.slice(1).map(r => ({
      tanggal: r[0],
      id_pengeluaran: r[1],
      item: r[2],
      keterangan: r[3],
      total: r[4]
    }));
    return NextResponse.json({ data: data.reverse() });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const b = await req.json();
    const sheets = await getGoogleSheets();
    const tanggal = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    const idExp = `EXP-${Date.now()}`;

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'pengeluaran!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[tanggal, idExp, b.item, b.keterangan, b.total]]
      }
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const id = new URL(req.url).searchParams.get('id');
    const sheets = await getGoogleSheets();
    const res = await sheets.spreadsheets.values.get({ 
      spreadsheetId: SPREADSHEET_ID, range: 'pengeluaran!B:B' 
    });
    const rows = res.data.values || [];
    const idx = rows.findIndex(r => r[0] === id);

    if (idx === -1) throw new Error("Data tidak ditemukan");

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        requests: [{
          deleteDimension: {
            range: {
              sheetId: 1608530804, // SESUAIKAN GID tab pengeluaran Anda
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