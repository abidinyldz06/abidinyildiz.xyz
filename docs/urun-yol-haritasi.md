# Yaşayan Orman ürün yol haritası

## Temel ilke

Oyunlaştırma dekoratif tıklamalardan değil, gerçek düşünme ve içerik üretme eylemlerinden beslenir. Seviye, bahçedeki emeğin özeti; görevler ise ne yapılacağını hatırlatan bakım önerileridir.

## Seviye sistemi

### Unvan katmanları

| Seviyeler | Katman | Anlamı |
| --- | --- | --- |
| 1–3 | Çırak Bahçıvan | İlk tohumları ve yaprakları oluşturur. |
| 4–6 | Bahçıvan | Düzenli bakım yapar ve bağlantılar kurar. |
| 7–9 | Ormancı | Birden fazla gelişmiş ağacı yönetir. |
| 10–14 | Orman Koruyucusu | Kadim ağaçlar ve okuma yolları oluşturur. |
| 15+ | Orman Kâhini | Ormanın uzun vadeli hafızasını ve yönünü kurar. |

Mevcut artan XP eğrisi korunabilir; fakat XP yalnızca doğrulanabilir ve bir kez ödüllendirilen eylemlerden gelmelidir.

### XP kaynakları

| Eylem | XP | Sınır |
| --- | ---: | --- |
| Yeni tohum eklemek | 20 | Tohum başına bir kez |
| Yeni yaprak yayımlamak | 15 | Yaprak başına bir kez |
| Anlamlı içerik güncellemesi | 10 | Günde en fazla iki kez |
| İki içerik arasında bağlantı kurmak | 5 | Günde en fazla beş kez |
| Günlük bakım görevini tamamlamak | 8 | Günde bir kez |
| Haftalık değerlendirme | 30 | Haftada bir kez |
| Bir ağacı Kadim statüsüne yükseltmek | 50 | Ağaç başına bir kez |
| Orman Yolu oluşturmak | 35 | Yol başına bir kez |

“Sula” düğmesine basmak XP vermemelidir. Bakım, içeriğin gerçekten güncellenmesi veya gözden geçirilmesiyle doğrulanmalıdır.

## Görev sistemi

### Günlük görevler

- Rastgele bir ağaç seç ve “Bu konu hakkında son zamanlarda ne değişti?” sorusunu cevapla.
- Uzun süredir güncellenmeyen bir yaprağı gözden geçir.
- Bir fikre karşı en güçlü itirazı üç cümleyle yaz.
- Birbirinden kopuk iki içeriğin bağlantısını açıkla.
- Bir ağacın eksik dalını belirle.

Rastgele fidan sorusu teknik olarak kolaydır. İlk sürümde tarih ve mevcut içerik listesinden deterministik bir seçim yapılır; böylece aynı gün bütün cihazlarda aynı soru gösterilebilir. Hazır soru şablonları ücretsizdir ve yapay zekâ servisi gerektirmez.

### Haftalık görevler

- Haftanın en önemli yeni düşüncesini seç.
- Bir ağacın “Bugün ne düşünüyorum?” metnini yenile.
- Bağlantısız bir notu ekosisteme bağla.
- Eski bir görüşü “Budanan Dallar” bölümüne taşı.
- Bir kaynak veya kitap notunu ilgili ağaca kök olarak ekle.

### Teknik aşamalar

1. **Şablon tabanlı görevler:** Backend gerekmez; görev tarih ve içeriklerden üretilir. Tamamlanma cihazda tutulur.
2. **Git ile doğrulanan görevler:** İçerik değişikliği commit edildiğinde görev tamamlanır ve XP hesaplanır.
3. **Akıllı görev önerileri:** İçerik grafiğindeki eksik bağlantılara ve bakım tarihlerine göre görev oluşturulur.
4. **İsteğe bağlı yapay zekâ:** Daha özgün sorular üretir; API maliyeti doğuracağı için ilk sürüme dahil edilmez.

## Obsidian’sız içerik yönetimi

### Önerilen mimari

GitHub deposu içerik veritabanı olarak kalır. Özel `/yonetim` ekranı Markdown dosyalarını form üzerinden düzenler ve GitHub’a commit gönderir. Vercel yeni commiti otomatik yayımlar.

Akış:

1. GitHub ile güvenli giriş.
2. Tohum, yaprak veya not formunu doldurma.
3. Sunucu tarafında Markdown üretme.
4. GitHub Contents API üzerinden commit oluşturma.
5. Vercel’in otomatik önizleme veya üretim dağıtımı.

GitHub erişim anahtarı hiçbir zaman tarayıcı koduna yazılmaz. Giriş ve commit işlemleri Vercel Function içinde yapılır. Bu aşamaya geçildiğinde Astro Vercel adaptörü yalnızca yönetim API rotaları için eklenir; halka açık içerik sayfaları statik kalabilir.

### Neden hemen klasik bir veritabanı değil?

- İçerikler Markdown olarak taşınabilir kalır.
- Ek barındırma veya Obsidian Sync ücreti gerekmez.
- Her değişikliğin Git geçmişi ve geri alma imkânı vardır.
- Mevcut Astro Content Collections yapısı korunur.

Gerçek veritabanı ancak kullanıcı hesapları, yorumlar, herkese açık görevler veya cihazlar arası anlık durum gerektiğinde eklenmelidir.

## Uygulama sırası

1. Kadim Ağaç ve tema altyapısı.
2. Hızlı ayarlar penceresi.
3. Günlük görev kartı ve içerik tabanlı XP hesaplama.
4. GitHub tabanlı özel yönetim ekranı.
5. Backlink, Orman Yolları ve Budanan Dallar.
6. İsteğe bağlı yorumlar veya topluluk özellikleri.
