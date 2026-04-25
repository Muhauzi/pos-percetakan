"use client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [data, setData] = useState({ omset: 0, pengeluaran: 0, trx: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ item: "", keterangan: "", total: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resJual, resKeluar] = await Promise.all([
        fetch('/api/penjualan').then(r => r.json()),
        fetch('/api/pengeluaran').then(r => r.json())
      ]);

      const totalOmset = resJual.data?.reduce((acc, curr) => acc + parseInt(curr.total || 0), 0) || 0;
      const totalKeluar = resKeluar.data?.reduce((acc, curr) => acc + parseInt(curr.total || 0), 0) || 0;

      setData({
        omset: totalOmset,
        pengeluaran: totalKeluar,
        trx: resJual.data?.length || 0
      });
    } catch (e) {
      console.error("Gagal ambil data dashboard", e);
    }
  };

  const handleSimpanPengeluaran = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/pengeluaran', {
      method: 'POST',
      body: JSON.stringify(form)
    });
    if (res.ok) {
      alert("Pengeluaran tercatat!");
      setForm({ item: "", keterangan: "", total: "" });
      setIsModalOpen(false);
      fetchData(); // Refresh angka di dashboard
    }
    setLoading(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 text-black">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rekap Keuangan</h1>
      </div>

      {/* Ringkasan Angka */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Uang Masuk (Omset)</p>
          <h2 className="text-2xl font-bold text-green-600">Rp {data.omset.toLocaleString('id-ID')}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Uang Keluar</p>
          <h2 className="text-2xl font-bold text-red-600">Rp {data.pengeluaran.toLocaleString('id-ID')}</h2>
        </div>
        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg">
          <p className="text-sm opacity-80">Sisa Saldo (Laba)</p>
          <h2 className="text-2xl font-extrabold">Rp {(data.omset - data.pengeluaran).toLocaleString('id-ID')}</h2>
        </div>
      </div>
    </div>
  );
}