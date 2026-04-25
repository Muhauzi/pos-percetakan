import { NextResponse } from "next/server";
// Ingat: Sesuaikan import ini jika Anda menggunakan relative path (../../../lib/googleSheets)
import { getGoogleSheets } from "@/lib/googleSheets";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// GET: Mengambil daftar kategori
export async function GET() {
  try {
    const sheets = await getGoogleSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "kategori!A:B", // Hanya butuh kolom A (ID) dan B (Nama Kategori)
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) return NextResponse.json({ data: [] });

    // Lewati baris pertama (header)
    const data = rows.slice(1).map((row) => ({
      id_kategori: row[0],
      nama_kategori: row[1],
    }));

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Menambah kategori baru
export async function POST(request) {
  try {
    const { nama_kategori } = await request.json();
    const id_kategori = `KAT-${Date.now()}`;

    const sheets = await getGoogleSheets();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "kategori!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[id_kategori, nama_kategori]],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Kategori berhasil ditambahkan!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// app/api/kategori/route.js

// ... (GET dan POST yang sudah ada tetap dipertahankan)

// PUT: Mengubah Nama Kategori
export async function PUT(request) {
  try {
    const { id_kategori, nama_baru } = await request.json();
    const sheets = await getGoogleSheets();

    // Ambil semua data untuk mencari baris mana yang akan diedit
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "kategori!A:B",
    });

    const rows = response.data.values;
    const rowIndex = rows.findIndex((row) => row[0] === id_kategori);

    if (rowIndex === -1) throw new Error("Kategori tidak ditemukan");

    // Update baris tersebut (indeks di Sheets mulai dari 1)
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `kategori!B${rowIndex + 1}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[nama_baru]] },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Menghapus Kategori
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id_kategori = searchParams.get("id");

    const sheets = await getGoogleSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "kategori!A:B",
    });

    const rows = response.data.values;
    const rowIndex = rows.findIndex((row) => row[0] === id_kategori);

    if (rowIndex === -1) throw new Error("Kategori tidak ditemukan");

    // Di Google Sheets API, menghapus baris tengah agak kompleks,
    // cara termudah adalah mengosongkan nilainya atau menggunakan batchUpdate
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 1669409862, // Pastikan GID sheet kategori adalah 0, atau cari ID-nya
                dimension: "ROWS",
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
              },
            },
          },
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
