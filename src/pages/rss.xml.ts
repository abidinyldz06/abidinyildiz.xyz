import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const escapeXML = (value: string) => value.replace(/[<>&'\"]/g, character => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'
})[character] || character);

export const GET: APIRoute = async ({ site }) => {
  const base = site || new URL('https://abidinyildiz.xyz');
  const notes = await getCollection('notes');
  const leaves = await getCollection('leaves');
  const entries = [
    ...notes.map(note => ({ title: note.data.title, date: note.data.date, url: `/notlar/${note.id}`, description: note.body })),
    ...leaves.map(leaf => ({ title: leaf.data.title, date: leaf.data.date, url: `/leaves/${leaf.id}`, description: leaf.body })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const items = entries.map(entry => `<item>
    <title>${escapeXML(entry.title)}</title>
    <link>${new URL(entry.url, base).href}</link>
    <guid>${new URL(entry.url, base).href}</guid>
    <pubDate>${entry.date.toUTCString()}</pubDate>
    <description>${escapeXML((entry.description || '').trim().replace(/\s+/g, ' ').slice(0, 300))}</description>
  </item>`).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel>
  <title>Yaşayan Orman</title>
  <link>${base.href}</link>
  <description>Abidin Yıldız’ın kişisel dijital bahçesi</description>
  <language>tr</language>
  ${items}
</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
