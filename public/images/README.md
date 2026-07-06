# Images Folder Structure

## Struktur Penyimpanan Gambar Portfolio

```
public/images/
├── about/
│   ├── about-1.jpg (atau .png)  - Foto profil untuk carousel section 1
│   ├── about-2.jpg              - Foto profil untuk carousel section 2
│   └── about-3.jpg              - Foto profil untuk carousel section 3
│
├── projects/
│   ├── qrcode-absensi.jpg       - Gambar project "Sistem Absensi QR Code"
│   ├── api-prestasi.jpg         - Gambar project "API Prestasi Mahasiswa"
│   ├── myhabit.jpg              - Gambar project "MyHabit"
│   ├── porterin.jpg             - Gambar project "PorterIn"
│   └── learnon.jpg              - Gambar project "LearnOn"
│
└── profile.jpg (optional)       - Foto profil utama
```

## Format Gambar yang Disarankan

- **Format**: JPG, PNG, atau WebP
- **Ukuran**:
  - About carousel: 800x800px (square)
  - Project images: 800x600px
- **File size**: Max 200-300KB per gambar (untuk performa optimal)

## Cara Menggunakan Gambar

Perbarui path di `page.tsx` dengan format:

```tsx
image: "/images/projects/nama-gambar.jpg";
```

## Contoh Gambar Gratis

- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com
- Freepik: https://freepik.com
