"use client";
import { useState, useEffect } from "react";
import SuccessModal from "./components/SuccessModal";
import LoadingOverlay from "./components/LoadingOverlay";

export default function KasirPage() {
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const [form, setForm] = useState({
    pelanggan: "",
    id_kategori: "",
    deskripsi: "",
    qty: 1,
    total: "",
    metode: "Cash",
  });

  useEffect(() => {
    fetch('/api/kategori').then(res => res.json()).then(res => setKategoriList(res.data || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/penjualan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setModalMsg("Transaksi penjualan berhasil dicatat ke sistem!");
        setShowModal(true);
        setForm({ pelanggan: "", id_kategori: "", deskripsi: "", qty: 1, total: "", metode: "Cash" });
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto text-black pb-10">
      <LoadingOverlay isLoading={loading} />
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-black mb-6 text-blue-600 italic">Kasir POS</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nama Pelanggan</label>
            <input 
              className="w-full border-gray-200 border p-3 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.pelanggan} onChange={e => setForm({...form, pelanggan: e.target.value})} required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Kategori Jasa</label>
            <select 
              className="w-full border-gray-200 border p-3 rounded-2xl bg-gray-50 outline-none"
              value={form.id_kategori} onChange={e => setForm({...form, id_kategori: e.target.value})} required
            >
              <option value="">Pilih Kategori...</option>
              {kategoriList.map(k => <option key={k.id_kategori} value={k.id_kategori}>{k.nama_kategori}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Deskripsi Pesanan</label>
            <textarea 
              className="w-full border-gray-200 border p-3 rounded-2xl bg-gray-50 outline-none"
              placeholder="Detail pesanan..."
              value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Qty</label>
              <input 
                type="number" className="w-full border-gray-200 border p-3 rounded-2xl bg-gray-50"
                value={form.qty} onChange={e => setForm({...form, qty: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Total Harga (Rp)</label>
              <input 
                type="number" className="w-full border-gray-200 border p-3 rounded-2xl bg-blue-50 font-bold text-blue-700"
                value={form.total} onChange={e => setForm({...form, total: e.target.value})} required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Metode Bayar</label>
            <div className="flex gap-4 mt-1">
              {["Cash", "Transfer", "QRIS"].map(m => (
                <label key={m} className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <input type="radio" name="metode" value={m} checked={form.metode === m} onChange={e => setForm({...form, metode: e.target.value})} />
                  <span className="text-sm font-medium">{m}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-black shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            {loading ? "Menyimpan..." : "SIMPAN TRANSAKSI"}
          </button>
        </form>
      </div>

      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} message={modalMsg} />
    </div>
  );
}