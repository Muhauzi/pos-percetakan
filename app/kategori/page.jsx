"use client";
import { useState, useEffect } from "react";
import SuccessModal from "../components/SuccessModal";
import LoadingOverlay from "../components/LoadingOverlay";
import ConfirmModal from "../components/ConfirmModal"; // Import ConfirmModal

export default function KategoriPage() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  // State khusus ConfirmModal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  useEffect(() => { fetchKategori(); }, []);

  const fetchKategori = () => {
    fetch('/api/kategori').then(res => res.json()).then(res => setList(res.data || []));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/kategori', { method: 'POST', body: JSON.stringify({ nama_kategori: input }) });
    setLoading(false);
    if (res.ok) {
      setModalMsg("Kategori baru berhasil ditambahkan!");
      setShowModal(true);
      setInput("");
      fetchKategori();
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    const res = await fetch('/api/kategori', { method: 'PUT', body: JSON.stringify({ id_kategori: id, nama_baru: editValue }) });
    setLoading(false);
    if (res.ok) {
      setModalMsg("Nama kategori berhasil diperbarui.");
      setShowModal(true);
      setEditId(null);
      fetchKategori();
    }
  };

  // Fungsi pemicu Modal Konfirmasi
  const handleDeleteTrigger = (id) => {
    setTargetId(id);
    setIsConfirmOpen(true);
  };

  // Fungsi eksekusi hapus yang sebenarnya (dipanggil dari ConfirmModal)
  const executeDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/kategori?id=${targetId}`, { method: 'DELETE' });
    setLoading(false);
    if (res.ok) {
      setModalMsg("Kategori telah berhasil dihapus.");
      setShowModal(true);
      fetchKategori();
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto text-black pb-20">
      <LoadingOverlay isLoading={loading} />
      
      <h1 className="text-2xl font-black mb-6 italic">Kelola Jasa</h1>
      
      <form onSubmit={handleAdd} className="flex gap-2 mb-8">
        <input 
          className="flex-1 border border-gray-200 p-4 rounded-2xl bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
          placeholder="Nama Jasa Baru (Misal: Mug)"
          value={input} onChange={e => setInput(e.target.value)} required
        />
        <button className="bg-blue-600 text-white px-8 rounded-2xl font-black shadow-lg shadow-blue-100 active:scale-95 transition-all">+</button>
      </form>

      <div className="grid gap-3">
        {list.map(item => (
          <div key={item.id_kategori} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex-1 mr-4">
              {editId === item.id_kategori ? (
                <input 
                  className="w-full border-b-2 border-blue-500 p-1 font-bold outline-none bg-blue-50"
                  value={editValue} onChange={e => setEditValue(e.target.value)}
                  autoFocus
                />
              ) : (
                <div>
                  <p className="font-bold text-gray-800 uppercase tracking-tight">{item.nama_kategori}</p>
                  <p className="text-[10px] text-gray-300 font-mono italic">{item.id_kategori}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-4 text-xs font-black">
              {editId === item.id_kategori ? (
                <button onClick={() => handleEdit(item.id_kategori)} className="text-green-600 uppercase hover:text-green-700 transition-colors">Simpan</button>
              ) : (
                <>
                  <button onClick={() => { setEditId(item.id_kategori); setEditValue(item.nama_kategori); }} className="text-blue-500 uppercase hover:text-blue-600 transition-colors">Edit</button>
                  <button onClick={() => handleDeleteTrigger(item.id_kategori)} className="text-red-400 uppercase hover:text-red-500 transition-colors">Hapus</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL KONFIRMASI CUSTOM */}
      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={executeDelete}
        title="Hapus Jasa?"
        message="Data kategori ini akan dihapus permanen dari sistem."
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