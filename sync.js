import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const VAULT_PATH = process.env.OBSIDIAN_VAULT_PATH;
const TARGET_DIR = path.join(__dirname, 'src', 'content');
const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const shouldPublish = args.has('--publish');

function run(command) {
  execSync(command, { cwd: __dirname, stdio: 'inherit' });
}

async function sync() {
  console.log('🌲 Yaşayan Orman — Obsidian senkronizasyonu\n');

  if (!VAULT_PATH) {
    console.error('❌ OBSIDIAN_VAULT_PATH ayarlanmamış. .env.example dosyasını .env olarak kopyalayıp yolu güncelleyin.');
    process.exitCode = 1;
    return;
  }

  const resolvedVault = path.resolve(VAULT_PATH);
  if (!await fs.pathExists(resolvedVault)) {
    console.error(`❌ Belirtilen kasa bulunamadı: ${resolvedVault}`);
    process.exitCode = 1;
    return;
  }

  const sources = [
    { label: 'Tohumlar', source: path.join(resolvedVault, 'seeds'), target: path.join(TARGET_DIR, 'seeds') },
    { label: 'Yapraklar', source: path.join(resolvedVault, 'leaves'), target: path.join(TARGET_DIR, 'leaves') },
  ];
  const available = [];

  for (const entry of sources) {
    if (await fs.pathExists(entry.source)) available.push(entry);
  }

  if (available.length === 0) {
    console.error('❌ Obsidian kasasında seeds veya leaves klasörü bulunamadı.');
    process.exitCode = 1;
    return;
  }

  for (const entry of available) {
    if (dryRun) {
      console.log(`🔎 ${entry.label}: ${entry.source} → ${entry.target}`);
    } else {
      await fs.copy(entry.source, entry.target, { overwrite: true });
      console.log(`✅ ${entry.label} kopyalandı.`);
    }
  }

  if (dryRun) {
    console.log('\nℹ️ Kuru çalışma tamamlandı; hiçbir dosya değiştirilmedi.');
    return;
  }

  console.log('\n🧪 İçerik derlemesi doğrulanıyor...');
  run('npm run build');

  if (!shouldPublish) {
    console.log('\n✅ Senkronizasyon tamamlandı. Değişiklikleri inceleyin. Git işlemi yapılmadı.');
    console.log('Yayınlamak için: npm run sync -- --publish');
    return;
  }

  console.log('\n📦 İçerik değişiklikleri yayınlanıyor...');
  run('git add -- src/content/seeds src/content/leaves');

  try {
    execSync('git diff --staged --quiet', { cwd: __dirname });
    console.log('ℹ️ Yayınlanacak yeni içerik değişikliği yok.');
  } catch {
    run('git commit -m "sync: obsidian notları güncellendi"');
    run('git push');
    console.log('🎉 İçerikler GitHub’a gönderildi.');
  }
}

sync().catch(error => {
  console.error('❌ Senkronizasyon başarısız:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
