import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    readTime: z.number(),
    draft: z.boolean().default(false),
    hero: z.string().optional(),
  }),
});

export const collections = { posts };
