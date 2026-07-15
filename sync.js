import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// ES Module dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const VAULT_PATH = process.env.OBSIDIAN_VAULT_PATH;
const TARGET_DIR = path.join(__dirname, 'src', 'content');

async function sync() {
  console.log('🌲 Yaşayan Orman - Senkronizasyon Aracı Başlatıldı\n');

  if (!VAULT_PATH) {
    console.error('❌ HATA: OBSIDIAN_VAULT_PATH ayarlanmamış!');
    console.log('Lütfen proje ana dizininde bir .env dosyası oluşturun ve içine şu satırı ekleyin:');
    console.log('OBSIDIAN_VAULT_PATH=/Users/KullaniciAdin/Documents/ObsidianKasan/YasiyanOrman');
    process.exit(1);
  }

  if (!fs.existsSync(VAULT_PATH)) {
    console.error(`❌ HATA: Belirtilen klasör bulunamadı: ${VAULT_PATH}`);
    process.exit(1);
  }

  const vaultSeeds = path.join(VAULT_PATH, 'seeds');
  const vaultLeaves = path.join(VAULT_PATH, 'leaves');

  if (!fs.existsSync(vaultSeeds) && !fs.existsSync(vaultLeaves)) {
    console.warn('⚠️ Uyarı: Obsidian kasanızda "seeds" veya "leaves" klasörü bulunamadı.');
    console.log('Lütfen Obsidian kasanızın kök dizininde bu isimlerde klasörler oluşturun.');
  }

  try {
    // Kopyalama işlemi
    console.log('📦 Dosyalar kopyalanıyor...');
    
    if (fs.existsSync(vaultSeeds)) {
      await fs.copy(vaultSeeds, path.join(TARGET_DIR, 'seeds'), { overwrite: true });
      console.log('✅ Tohumlar (seeds) kopyalandı.');
    }
    
    if (fs.existsSync(vaultLeaves)) {
      await fs.copy(vaultLeaves, path.join(TARGET_DIR, 'leaves'), { overwrite: true });
      console.log('✅ Yapraklar (leaves) kopyalandı.');
    }

    console.log('\n🚀 GitHub\'a gönderiliyor (git add, commit, push)...');
    
    // Git komutları
    execSync('git add src/content/seeds/* src/content/leaves/*', { stdio: 'inherit' });
    
    // Check if there are changes to commit
    try {
      execSync('git diff --staged --quiet');
      console.log('ℹ️ Yeni bir değişiklik bulunamadı.');
    } catch (e) {
      // If error, it means there ARE changes
      execSync('git commit -m "sync: obsidian notları güncellendi 🌿"', { stdio: 'inherit' });
      execSync('git push', { stdio: 'inherit' });
      console.log('\n🎉 Başarılı! Değişiklikler canlıya gönderildi. Vercel kısa süre içinde siteyi güncelleyecektir.');
    }

  } catch (error) {
    console.error('❌ Senkronizasyon sırasında bir hata oluştu:', error);
  }
}

sync();
