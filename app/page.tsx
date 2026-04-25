"use client";
import Link from "next/link";
import NavbarLanding from "./components/NavbarLanding";

export default function ProfileUsaha() {
  const services = [
    {
      title: "Undangan",
      desc: "Undangan pernikahan, khitanan, & acara formal dengan desain elegan.",
      icon: "💌",
    },
    {
      title: "Buku Yasin",
      desc: "Cetak Yasin untuk mengenang orang tercinta dengan jilid rapi.",
      icon: "📖",
    },
    {
      title: "Stiker",
      desc: "Label produk, stiker komunitas, hingga cutting stiker custom.",
      icon: "🏷️",
    },
    {
      title: "Banner",
      desc: "Spanduk & Banner kualitas outdoor/indoor tahan cuaca.",
      icon: "🚩",
    },
    {
      title: "Poster",
      desc: "Poster promosi atau dekorasi dengan warna yang tajam.",
      icon: "🖼️",
    },
    {
      title: "Pamflet",
      desc: "Brosur & pamflet untuk promosi bisnis atau acara Anda.",
      icon: "📄",
    },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
      <NavbarLanding />

      {/* HERO SECTION */}
      <section 
      id="hero" className="relative bg-gradient-to-br from-blue-700 to-blue-900 py-20 px-4 text-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
            SOLUSI CETAK BERKUALITAS <br className="hidden md:block" /> UNTUK
            SEGALA KEBUTUHAN.
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 font-medium">
            Hasil Tajam, Proses Cepat, Harga Bersahabat. Apapun kebutuhan cetak
            Anda,{" "}
            <span className="text-yellow-400 font-bold italic">Percetakan Hade</span>{" "}
            solusinya.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              href="https://wa.me/+6285320246979"
              className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform"
            >
              ORDER VIA WHATSAPP
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="layanan" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-2">
            LAYANAN UNGGULAN KAMI
          </h2>
          <p className="text-gray-500">
            Kualitas cetak terbaik dengan teknologi mesin terbaru.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="group p-8 bg-gray-50 border border-gray-100 rounded-[40px] hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-200"
            >
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">
                {s.icon}
              </div>
              <h3 className="text-xl font-black mb-3 italic">
                {s.title.toUpperCase()}
              </h3>
              <p className="text-sm opacity-80 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section id="lokasi" className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-black mb-6 tracking-tighter leading-tight">
              MENGAPA HARUS DI{" "}
              <span className="text-blue-500 italic">Percetakan Hade</span>?
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-lg">Kualitas Warna Akurat</h4>
                  <p className="text-sm text-gray-400">
                    Mesin cetak terbaru memastikan warna hasil cetak sama dengan
                    file asli.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-lg">Pengerjaan Tepat Waktu</h4>
                  <p className="text-sm text-gray-400">
                    Kami menghargai waktu Anda. Proses cepat tanpa mengurangi
                    kualitas.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-lg">Harga Sangat Kompetitif</h4>
                  <p className="text-sm text-gray-400">
                    Harga bersaing dengan kualitas yang jauh lebih premium.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full bg-gray-800 rounded-[40px] overflow-hidden p-2 shadow-2xl">
            {/* FRAME MAPS */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18195.52547717498!2d107.60601228142869!3d-6.912555562218834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69385955883e2b%3A0x48d1f3576b01ea0a!2sGRW8%2B8QC%2C%20Kamarung%2C%20Kec.%20Pagaden%2C%20Kabupaten%20Subang%2C%20Jawa%20Barat%2041252!5e1!3m2!1sid!2sid!4v1777125555065!5m2!1sid!2sid"
              width="100%"
              height="400"
              className="rounded-[35px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-20 px-4 text-center bg-white">
        <h2 className="text-3xl font-black mb-6 italic">
          SIAP CETAK KEBUTUHAN ANDA?
        </h2>
        <p className="text-gray-500 mb-10 max-w-xl mx-auto">
          Konsultasikan desain Anda secara gratis melalui WhatsApp atau datang
          langsung ke workshop kami.
        </p>
        <div className="flex justify-center gap-4">
        <Link
              href="https://wa.me/+6285320246979"
              className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform"
            >
              HUBUNGI SEKARANG
            </Link>
        </div>
      </section>

      <footer className="py-10 border-t border-gray-100 text-center text-gray-400 text-xs">
        <p>© 2026 Percetakan Hade Printing Service. All rights reserved.</p>
      </footer>
    </div>
  );
}
