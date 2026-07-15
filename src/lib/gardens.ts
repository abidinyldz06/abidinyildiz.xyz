export const GARDENS = {
  dusunce: { label: 'Düşünce', icon: '💭', description: 'Fikirler, sorular ve gözlemler' },
  gunluk: { label: 'Günlük', icon: '📔', description: 'Günlerden kalan kişisel izler' },
  hobi: { label: 'Hobi', icon: '🫖', description: 'Koleksiyonlar ve meraklar' },
  kitap: { label: 'Kitap', icon: '📚', description: 'Okuma notları ve değerlendirmeler' },
  oyun: { label: 'Oyun', icon: '🎮', description: 'Oyun günlükleri ve maceralar' },
} as const;

export type GardenKey = keyof typeof GARDENS;
