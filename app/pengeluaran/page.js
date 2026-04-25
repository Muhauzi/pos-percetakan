"use client";
import { useState, useEffect } from "react";
import SuccessModal from "../components/SuccessModal";
import LoadingOverlay from "../components/LoadingOverlay";

export default function PengeluaranPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ item: "", keterangan: "", total: "" });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  useEffect(() => { fetchExp(); }, []);

  const fetchExp = async () => {
    const res = await fetch('/api/pengeluaran');
    const result = await res.json();
    if (result.data) setList(result.data);
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/pengeluaran', {
      method: 'POST',
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setModalMsg("Biaya pengeluaran telah dicatat.");
      setShowModal(true);
      setForm({ item: "", keterangan: "", total: "" });
      fetchExp();
    }
    setLoading(false);
  };

  const handleHapus = async (id) => {
    if (!confirm("Hapus catatan pengeluaran ini?")) return;
    const res = await fetch(`/api/pengeluaran?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setModalMsg("Catatan pengeluaran berhasil dihapus.");
      setShowModal(true);
      fetchExp();
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto text-black">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-red-600 italic">Pengeluaran</h1>
        <p className="text-sm text-gray-400">Catat setiap uang yang keluar untuk modal usaha.</p>
      </div>

      {/* Form Card */}
      <div className="bg-white border-2 border-red-50 p-6 rounded-3xl shadow-sm mb-10">
        <form onSubmit={handleSimpan} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            className="w-full border-gray-100 border p-4 rounded-2xl bg-gray-50"
            placeholder="Nama Barang (Misal: Tinta)"
            value={form.item} onChange={e => setForm({...form, item: e.target.value})} required
          />
          <input 
            className="w-full border-gray-100 border p-4 rounded-2xl bg-gray-50"
            placeholder="Keterangan (Misal: 2 Botol)"
            value={form.keterangan} onChange={e => setForm({...form, keterangan: e.target.value})} required
          />
          <input 
            type="number" className="w-full border-gray-100 border p-4 rounded-2xl bg-gray-50 font-bold"
            placeholder="Total Harga (Rp)"
            value={form.total} onChange={e => setForm({...form, total: e.target.value})} required
          />
          <button disabled={loading} className="bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-100">
            {loading ? "..." : "SIMPAN BIAYA"}
          </button>
        </form>
      </div>

      {/* List Card */}
      <div className="space-y-4">
        {list.map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center group">
            <div>
              <p className="text-[10px] font-bold text-gray-300 uppercase">{item.tanggal}</p>
              <p className="font-black text-gray-800">{item.item}</p>
              <p className="text-xs text-gray-400 italic">{item.keterangan}</p>
            </div>
            <div className="text-right">
              <p className="font-black text-red-600">Rp {Number(item.total).toLocaleString('id-ID')}</p>
              <button onClick={() => handleHapus(item.id_pengeluaran)} className="text-[10px] font-black text-gray-300 hover:text-red-500 uppercase">Hapus</button>
            </div>
          </div>
        ))}
      </div>

      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} message={modalMsg} />
    </div>
  );
}