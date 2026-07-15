// Büyüme hesaplama fonksiyonları

export type Stage = 'seed' | 'seedling' | 'sapling' | 'tree';

export interface StageInfo {
  key: Stage;
  label: string;
  icon: string;
  color: string;
  minMonths: number;
}

export const STAGES: Record<Stage, StageInfo> = {
  seed: { key: 'seed', label: 'Tohum', icon: '🌱', color: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400', minMonths: 0 },
  seedling: { key: 'seedling', label: 'Fidan', icon: '🌿', color: 'bg-green-500/20 text-green-700 dark:text-green-400', minMonths: 3 },
  sapling: { key: 'sapling', label: 'Genç Ağaç', icon: '🌳', color: 'bg-teal-500/20 text-teal-700 dark:text-teal-400', minMonths: 6 },
  tree: { key: 'tree', label: 'Kadim Ağaç', icon: '🌲', color: 'bg-forest-accent-light/20 text-forest-text-light dark:text-forest-accent-dark', minMonths: 12 },
};

export function calculateStage(plantedAt: Date): Stage {
  const now = new Date();
  const msPerMonth = 1000 * 60 * 60 * 24 * 30;
  const monthsElapsed = (now.getTime() - plantedAt.getTime()) / msPerMonth;

  if (monthsElapsed >= 12) return 'tree';
  if (monthsElapsed >= 6) return 'sapling';
  if (monthsElapsed >= 3) return 'seedling';
  return 'seed';
}

export function getStageInfo(plantedAt: Date): StageInfo {
  return STAGES[calculateStage(plantedAt)];
}

export function getGrowthPercent(plantedAt: Date): number {
  const now = new Date();
  const msPerMonth = 1000 * 60 * 60 * 24 * 30;
  const monthsElapsed = (now.getTime() - plantedAt.getTime()) / msPerMonth;
  // Cap at 12 months = 100%
  return Math.min(100, Math.round((monthsElapsed / 12) * 100));
}

export function daysSince(date: Date): number {
  const now = new Date();
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

export function needsWater(lastLeafDate: Date | null, thresholdDays: number = 14): boolean {
  if (!lastLeafDate) return true;
  return daysSince(lastLeafDate) > thresholdDays;
}

export function formatTimeSince(date: Date): string {
  const days = daysSince(date);
  if (days === 0) return 'Bugün';
  if (days === 1) return 'Dün';
  if (days < 7) return `${days} gün önce`;
  if (days < 30) return `${Math.floor(days / 7)} hafta önce`;
  if (days < 365) return `${Math.floor(days / 30)} ay önce`;
  return `${Math.floor(days / 365)} yıl önce`;
}
