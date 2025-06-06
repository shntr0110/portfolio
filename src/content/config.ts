import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      ogImage: image().optional(),
    }),
});

export const collections = {
  works,
};
