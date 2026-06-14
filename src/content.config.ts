import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/posts' }),
  schema: ({image}) => z.object({
    title: z.string(),
    titleEn: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    hero: image().optional(),
  }),
});

export const collections = { posts };
