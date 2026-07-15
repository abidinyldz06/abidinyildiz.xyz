# abidinyildiz.xyz

Abidin Yıldız'ın fikirlerini, projelerini ve notlarını bir dijital bahçe düzeninde yayımlayan kişisel web sitesi.

## Yapı

- **Tohumlar (`seeds`)**: Zaman içinde gelişen ana konular.
- **Yapraklar (`leaves`)**: Bir tohuma bağlı yazılar ve notlar.
- **Bakım sistemi**: İçeriklerin yaşına ve son güncelleme tarihine göre büyüme/sulama durumu.
- **Obsidian eşitleme**: Yerel kasadaki `seeds` ve `leaves` klasörlerini site içeriğine kopyalayan yardımcı araç.

## Gereksinimler

- Node.js 22.12 veya üzeri
- npm

## Yerel geliştirme

```sh
npm install
npm run dev
```

Site varsayılan olarak `http://localhost:4321` adresinde açılır.

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusunu başlatır. |
| `npm run build` | Üretim sürümünü `dist/` klasörüne derler. |
| `npm run preview` | Üretim derlemesini yerelde önizler. |
| `npm run astro -- check` | Astro ve TypeScript tanılamalarını çalıştırır. |
| `npm run sync` | Obsidian içeriğini kopyalar, commit eder ve uzak depoya gönderir. |

## İçerik ekleme

Tohumlar `src/content/seeds/`, yapraklar ise `src/content/leaves/` altında Markdown olarak tutulur. Başlangıç dosyaları için `obsidian_templates/` klasöründeki şablonlar kullanılabilir.

## Obsidian eşitleme

1. `.env.example` dosyasını `.env` adıyla kopyalayın.
2. `OBSIDIAN_VAULT_PATH` değerini Obsidian kasanızın mutlak yolu olarak ayarlayın.
3. Kasanın kökünde `seeds/` ve/veya `leaves/` klasörlerinin bulunduğundan emin olun.
4. `npm run sync` komutunu çalıştırın.

> `sync` komutu yalnızca dosya kopyalamaz; değişiklik varsa otomatik olarak Git commit ve push işlemi de yapar.

## Teknolojiler

Astro 7, Tailwind CSS 4, Astro Content Collections, MDX ve Fuse.js.
