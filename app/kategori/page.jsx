"use client";
import { useState, useEffect } from "react";
import SuccessModal from "../components/SuccessModal";
import LoadingOverlay from "../components/LoadingOverlay";

export default function KategoriPage() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  

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

  const handleDelete = async (id) => {
    if (!confirm("Hapus kategori ini?")) return;
    
    setLoading(true);
    const res = await fetch(`/api/kategori?id=${id}`, { method: 'DELETE' });
    setLoading(false);
    if (res.ok) {
      setModalMsg("Kategori telah berhasil dihapus.");
      setShowModal(true);
      fetchKategori();
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto text-black">
      <LoadingOverlay isLoading={loading} />
      <h1 className="text-2xl font-black mb-6">Kelola Jasa</h1>
      
      <form onSubmit={handleAdd} className="flex gap-2 mb-8">
        <input 
          className="flex-1 border border-gray-200 p-4 rounded-2xl bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Nama Jasa Baru (Misal: Mug)"
          value={input} onChange={e => setInput(e.target.value)} required
        />
        <button className="bg-blue-600 text-white px-8 rounded-2xl font-black shadow-lg shadow-blue-100">+</button>
      </form>

      <div className="grid gap-3">
        {list.map(item => (
          <div key={item.id_kategori} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex-1 mr-4">
              {editId === item.id_kategori ? (
                <input 
                  className="w-full border-b-2 border-blue-500 p-1 font-bold outline-none"
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
                <button onClick={() => handleEdit(item.id_kategori)} className="text-green-600 uppercase">Simpan</button>
              ) : (
                <>
                  <button onClick={() => { setEditId(item.id_kategori); setEditValue(item.nama_kategori); }} className="text-blue-500 uppercase">Edit</button>
                  <button onClick={() => handleDelete(item.id_kategori)} className="text-red-400 uppercase">Hapus</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} message={modalMsg} />
    </div>
  );
}