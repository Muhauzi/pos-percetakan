"use client";
import { useState, useEffect } from "react";
import SuccessModal from "../components/SuccessModal";
import LoadingOverlay from "../components/LoadingOverlay";
import ConfirmModal from "../components/ConfirmModal"; // Import ConfirmModal custom

export default function PengeluaranPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ item: "", keterangan: "", total: "" });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  // State untuk Konfirmasi Hapus
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

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
    setLoading(false);
    if (res.ok) {
      setModalMsg("Biaya pengeluaran telah dicatat.");
      setShowModal(true);
      setForm({ item: "", keterangan: "", total: "" });
      fetchExp();
    }
  };

  // Fungsi untuk memicu Modal Konfirmasi
  const handleDeleteTrigger = (id) => {
    setTargetId(id);
    setIsConfirmOpen(true);
  };

  // Fungsi eksekusi hapus setelah dikonfirmasi
  const executeDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/pengeluaran?id=${targetId}`, { method: 'DELETE' });
    setLoading(false);
    if (res.ok) {
      setModalMsg("Catatan pengeluaran berhasil dihapus.");
      setShowModal(true);
      fetchExp();
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto text-black pb-20">
      <LoadingOverlay isLoading={loading} />
      
      <div className="mb-8">
        <h1 className="text-2xl font-black text-red-600 italic">Pengeluaran</h1>
        <p className="text-sm text-gray-400">Catat setiap uang yang keluar untuk modal usaha.</p>
      </div>

      {/* Form Card */}
      <div className="bg-white border-2 border-red-50 p-6 rounded-3xl shadow-sm mb-10">
        <form onSubmit={handleSimpan} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            className="w-full border-gray-100 border p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Nama Barang (Misal: Tinta)"
            value={form.item} onChange={e => setForm({...form, item: e.target.value})} required
          />
          <input 
            className="w-full border-gray-100 border p-4 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Keterangan (Misal: 2 Botol)"
            value={form.keterangan} onChange={e => setForm({...form, keterangan: e.target.value})} required
          />
          <input 
            type="number" className="w-full border-gray-100 border p-4 rounded-2xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Total Harga (Rp)"
            value={form.total} onChange={e => setForm({...form, total: e.target.value})} required
          />
          <button disabled={loading} className="bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-100 active:scale-95 transition-all">
            {loading ? "..." : "SIMPAN BIAYA"}
          </button>
        </form>
      </div>

      {/* List Card */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-700 px-2">Riwayat Biaya</h3>
        {list.map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center group animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <p className="text-[10px] font-bold text-gray-300 uppercase">{item.tanggal}</p>
              <p className="font-black text-gray-800 uppercase tracking-tight">{item.item}</p>
              <p className="text-xs text-gray-400 italic">Ket: {item.keterangan}</p>
            </div>
            <div className="text-right">
              <p className="font-black text-red-600 italic">Rp {Number(item.total).toLocaleString('id-ID')}</p>
              <button 
                onClick={() => handleDeleteTrigger(item.id_pengeluaran)} 
                className="text-[10px] font-black text-gray-300 hover:text-red-500 uppercase transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <p className="text-center text-gray-400 py-10 italic">Belum ada catatan pengeluaran.</p>
        )}
      </div>

      {/* MODAL KONFIRMASI CUSTOM */}
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={executeDelete}
        title="Hapus Biaya?"
        message={`Hapus catatan "${list.find(x => x.id_pengeluaran === targetId)?.item}"?`}
        confirmText="Ya, Hapus"
      />

      {/* MODAL SUKSES CUSTOM */}
      <SuccessModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        message={modalMsg} 
      />
    </div>
  );
}