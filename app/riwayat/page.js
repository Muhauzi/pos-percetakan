"use client";
import { useState, useEffect } from "react";

export default function RiwayatPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/penjualan').then(res => res.json()).then(res => {
      setData(res.data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4 md:p-8 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Riwayat Penjualan</h1>
        <button onClick={() => window.location.reload()} className="text-sm bg-gray-200 px-3 py-1 rounded-lg">Refresh</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
              <tr>
                <th className="p-4">Tanggal / Pelanggan</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Detail</th>
                <th className="p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="4" className="p-10 text-center">Memuat data...</td></tr>
              ) : data.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-4">
                    <p className="text-[10px] text-gray-400">{item.tanggal}</p>
                    <p className="font-bold">{item.pelanggan}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-[10px] font-bold">
                      {item.nama_kategori}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {item.deskripsi} <span className="text-xs text-gray-400">({item.qty}x)</span>
                  </td>
                  <td className="p-4 text-right">
                    <p className="font-bold text-blue-600">Rp {Number(item.total).toLocaleString('id-ID')}</p>
                    <p className="text-[10px] text-gray-400">{item.metode}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}