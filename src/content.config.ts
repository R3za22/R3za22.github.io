import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema } from './lib/schema';

// Entry ids are `<lang>/<slug>`, e.g. `en/mangaro` and `fa/mangaro`.
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: projectSchema,
});

export const collections = { projects };
