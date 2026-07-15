import { getCollection } from 'astro:content';

export async function GET() {
  const seeds = await getCollection('seeds');
  const leaves = await getCollection('leaves');

  const searchData: Array<{ id: string, title: string, description: string, type: string, url: string, icon: string }> = [];

  // Add seeds
  seeds.forEach(seed => {
    searchData.push({
      id: seed.id,
      title: seed.data.title,
      description: seed.data.description,
      type: 'Tohum',
      url: `/seeds/${seed.id}`,
      icon: seed.data.icon || '🌱'
    });
  });

  // Add leaves
  leaves.forEach(leaf => {
    searchData.push({
      id: leaf.id,
      title: leaf.data.title,
      description: leaf.body || '', // Include body for content search
      type: 'Yaprak',
      url: `/leaves/${leaf.id}`,
      icon: '🍃'
    });
  });

  return new Response(JSON.stringify(searchData), {
    headers: { 'Content-Type': 'application/json' }
  });
}
