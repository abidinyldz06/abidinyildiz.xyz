// Caretaker (profil) yönetimi — localStorage tabanlı

export interface Caretaker {
  name: string;
  avatar: string;
  title: string;
  gardenName: string;
  createdAt: string;
  level: number;
  xp: number;
  xpToNext: number;
  achievements: string[];
}

export const TITLES = [
  { key: 'ormanci', label: '🌲 Ormancı' },
  { key: 'botanikci', label: '🌿 Botanikçi' },
  { key: 'ciftci', label: '🌾 Çiftçi' },
  { key: 'buyucu', label: '✨ Doğa Büyücüsü' },
  { key: 'kahin', label: '🔮 Orman Kâhini' },
  { key: 'koruyucu', label: '🛡️ Orman Koruyucusu' },
];

export const AVATARS = [
  { key: 'caretaker', src: '/avatars/caretaker.png', label: 'Bahçıvan' },
  { key: 'druid', src: '/avatars/druid.png', label: 'Druid' },
  { key: 'botanist', src: '/avatars/botanist.png', label: 'Botanikçi' },
  { key: 'ranger', src: '/avatars/ranger.png', label: 'Korucu' },
  { key: 'wizard', src: '/avatars/wizard.png', label: 'Büyücü' },
  { key: 'fairy', src: '/avatars/fairy.png', label: 'Peri' },
  { key: 'shaman', src: '/avatars/shaman.png', label: 'Şaman' },
];

export const DEFAULT_CARETAKER: Caretaker = {
  name: 'Bahçıvan',
  avatar: '/avatars/caretaker.png',
  title: '🌲 Ormancı',
  gardenName: 'Gizli Bahçe',
  createdAt: new Date().toISOString(),
  level: 1,
  xp: 0,
  xpToNext: 100,
  achievements: [],
};

export const ACHIEVEMENTS_DB: Record<string, { id: string, title: string, icon: string, description: string }> = {
  first_seed: { id: 'first_seed', title: 'İlk Tohum', icon: '🌱', description: 'Ormana ilk tohumunu ektin.' },
  water_drop: { id: 'water_drop', title: 'Can Suyu', icon: '💧', description: 'Bir ağacı ilk kez suladın.' },
  ancient_tree: { id: 'ancient_tree', title: 'Kadim Ağaç', icon: '🌲', description: 'Bir ağacı kadim evreye ulaştırdın.' },
  forest_guardian: { id: 'forest_guardian', title: 'Orman Bekçisi', icon: '🛡️', description: 'Seviye 5 oldun.' }
};

// XP tablosu: her seviye için gereken toplam XP
export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.3, level - 1));
}

export function addXP(caretaker: Caretaker, amount: number): Caretaker {
  let { xp, level, xpToNext } = caretaker;
  xp += amount;
  while (xp >= xpToNext) {
    xp -= xpToNext;
    level++;
    xpToNext = xpForLevel(level);
  }
  return { ...caretaker, xp, level, xpToNext };
}

export function unlockAchievement(caretaker: Caretaker, achievementId: string): Caretaker {
  if (!caretaker.achievements) {
    caretaker.achievements = [];
  }
  if (!caretaker.achievements.includes(achievementId)) {
    caretaker.achievements.push(achievementId);
    // Optional: Add XP bonus for achievement
    return addXP(caretaker, 50);
  }
  return caretaker;
}
