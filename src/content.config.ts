import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const seeds = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/seeds" }),
  schema: z.object({
    title: z.string(),
    plantedAt: z.coerce.date(),
    icon: z.string().default('🌱'),
    description: z.string().default(''),
    tags: z.array(z.string()).default([]),
    maturity: z.enum(['growing', 'ancient']).default('growing'),
    thesis: z.string().optional(),
    lastTended: z.coerce.date().optional(),
  }),
});

const leaves = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/leaves" }),
  schema: z.object({
    title: z.string(),
    seedRef: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

const notes = defineCollection({
  loader: glob({
    pattern: "{dusunce,gunluk,hobi,kitap,oyun}/**/*.md",
    base: "./src/content",
  }),
  schema: z.object({
    title: z.string(),
    garden: z.enum(['dusunce', 'gunluk', 'hobi', 'kitap', 'oyun']),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    mood: z.string().optional(),
    gray: z.boolean().default(false),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: "now.md", base: "./src/content" }),
  schema: z.object({
    updated: z.coerce.date(),
    playing: z.string(),
    reading: z.string(),
    backlog: z.string(),
    work: z.string(),
    mood: z.string(),
  }),
});

export const collections = { seeds, leaves, notes, now };
