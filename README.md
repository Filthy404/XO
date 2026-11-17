# Website untuk Dzahwa

Buka `index.html` di browser (klik dua kali). Semua berjalan offline, tanpa instalasi.

## Struktur folder

```
dzahwa-site/
  index.html        kerangka halaman (markup)
  css/style.css     seluruh tampilan, animasi, dan doodle
  js/content.js     SEMUA teks yang bisa kamu edit: renungan, surat, kartu takdir, sapaan kucing, fitur SHAP, keterangan foto
  js/main.js        logika dan animasi (tidak perlu diubah untuk mengganti teks)
  src/foto-1.jpg    foto anabul, urutan sama dengan daftar `photos` di content.js
  ...
  bye.mp3           (taruh sendiri di folder ini, sejajar dengan index.html)
```

## Cara mengubah

- Ganti kalimat: edit `js/content.js`.
- Ganti foto: timpa `src/foto-N.jpg` dengan file baru (nama sama, sebaiknya persegi).
- Musik: salin lagu milikmu ke folder ini dengan nama `bye.mp3`. Kalau file tidak ada, halaman memakai melodi cadangan.
- Warna: ubah variabel `--accent`, `--bg`, dan sejenisnya di bagian atas `css/style.css`.

## Menaruh di internet

Unggah seluruh folder ke layanan hosting statis (GitHub Pages, Netlify, Vercel). Jangan ubah susunan folder, karena `index.html` memuat file lain lewat alamat relatif.
