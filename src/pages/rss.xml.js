import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return rss({
    title: 'Kotonoha',
    description: 'ことのは — a gentle tech blog',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        description: post.data.description ?? post.data.titleEn,
        pubDate: post.data.date,
        link: `/posts/${post.id}/`,
      })),
    customData: '<language>ja</language>',
  });
}
