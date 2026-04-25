"use client";
import { useState, useEffect } from "react";
import SuccessModal from "../components/SuccessModal";
import LoadingOverlay from "../components/LoadingOverlay";
import ConfirmModal from "../components/ConfirmModal"; // Import ConfirmModal

export default function KasirPage() {
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  // State untuk ConfirmModal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

  // 1. Fungsi pemicu Modal Konfirmasi
  const handleConfirmTrigger = (e) => {
    e.preventDefault(); // Cegah form submit langsung
    setIsConfirmOpen(true);
  };

  // 2. Fungsi eksekusi simpan yang sebenarnya
  const executeSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/penjualan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setModalMsg(`Transaksi untuk ${form.pelanggan} berhasil dicatat!`);
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
      
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-500">
        <h1 className="text-2xl font-black mb-6 text-blue-600 italic">Kasir POS</h1>
        
        {/* OnSubmit sekarang memicu modal konfirmasi dulu */}
        <form onSubmit={handleConfirmTrigger} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nama Pelanggan</label>
            <input 
              className="w-full border-gray-200 border p-3 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={form.pelanggan} onChange={e => setForm({...form, pelanggan: e.target.value})} required
              placeholder="Masukkan nama..."
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Kategori Jasa</label>
            <select 
              className="w-full border-gray-200 border p-3 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={form.id_kategori} onChange={e => setForm({...form, id_kategori: e.target.value})} required
            >
              <option value="">Pilih Kategori...</option>
              {kategoriList.map(k => <option key={k.id_kategori} value={k.id_kategori}>{k.nama_kategori}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Deskripsi Pesanan</label>
            <textarea 
              className="w-full border-gray-200 border p-3 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[80px]"
              placeholder="Detail pesanan (ukuran, bahan, dll)..."
              value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Qty</label>
              <input 
                type="number" className="w-full border-gray-200 border p-3 rounded-2xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={form.qty} onChange={e => setForm({...form, qty: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Total Harga (Rp)</label>
              <input 
                type="number" className="w-full border-gray-200 border p-3 rounded-2xl bg-blue-50 font-bold text-blue-700 outline-none focus:ring-2 focus:ring-blue-500"
                value={form.total} onChange={e => setForm({...form, total: e.target.value})} required
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Metode Bayar</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {["Cash", "Transfer", "QRIS"].map(m => (
                <label key={m} className={`flex-1 flex items-center justify-center gap-2 cursor-pointer px-4 py-3 rounded-xl border transition-all ${form.metode === m ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100' : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100'}`}>
                  <input type="radio" name="metode" value={m} checked={form.metode === m} onChange={e => setForm({...form, metode: e.target.value})} className="hidden" />
                  <span className="text-sm font-bold uppercase tracking-wider">{m}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl font-black shadow-lg shadow-blue-100 transition-all active:scale-95 disabled:bg-blue-300"
            >
              {loading ? "MEMPROSES..." : "SIMPAN TRANSAKSI"}
            </button>
          </div>
        </form>
      </div>

      {/* MODAL KONFIRMASI CUSTOM */}
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={executeSubmit}
        title="Simpan Transaksi?"
        message={`Simpan penjualan untuk ${form.pelanggan || 'Pelanggan'} senilai Rp ${Number(form.total || 0).toLocaleString('id-ID')}?`}
        confirmText="Ya, Simpan"
        type="primary" // Tipe primary biasanya biru/kuning, bukan merah bahaya
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