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
