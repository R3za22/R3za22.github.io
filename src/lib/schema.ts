import { z } from 'astro/zod';

// One schema for both languages: a missing or empty FA field fails the build
// the same way a missing EN field does. Placeholder values such as
// `[placeholder]` are non-empty strings, so they pass validation and are
// tracked in CONTENT-TODO.md instead.

const url = z.string().url();

export const projectSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  role: z.string().min(1),
  status: z.enum(['production', 'shipped', 'archived']),
  team: z.boolean(),
  stack: z.array(z.string().min(1)),
  links: z.object({
    github: url.optional(),
    // Absolute URL, or a root-relative path such as /demos/mizan/ for a static demo.
    demo: z
      .string()
      .min(1)
      .refine((v) => v.startsWith('/') || /^https?:\/\//.test(v))
      .optional(),
    apk: url.optional(),
    credit: z.object({ label: z.string().min(1), url }).optional(),
  }),
  order: z.number().int(),
  featured: z.boolean(),
  // Early-work entries render as a small list under More projects.
  early: z.boolean().optional(),
  images: z.array(z.string().min(1)).default([]),
  // Case-study fields. Optional so that a project can ship without them; the
  // case-study page shows `[placeholder]` for any that are missing.
  pitch: z.string().min(1).optional(),
  demoNote: z.string().min(1).optional(),
  media: z
    .array(z.object({ type: z.enum(['video', 'image']), src: z.string().min(1), alt: z.string().min(1) }))
    .optional(),
  platform: z.string().min(1).optional(),
  hosting: z.string().min(1).optional(),
  period: z.string().min(1).optional(),
  architecture: z
    .object({
      nodes: z.array(z.object({ title: z.string().min(1), detail: z.string().min(1) })),
      services: z.array(z.string().min(1)),
    })
    .optional(),
});

export const skillSchema = z
  .array(
    z.object({
      layer: z.string().min(1),
      items: z.array(z.string().min(1)).min(1),
      proof: z.string().min(1),
    }),
  )
  .length(6);

export const timelineSchema = z
  .array(
    z.object({
      period: z.string().min(1),
      title: z.string().min(1),
      detail: z.string().min(1),
    }),
  )
  .length(5);

// Person JSON-LD for the home pages (rendered by Seo.astro).
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Reza Ghamar',
  jobTitle: 'Mobile & Full-Stack Developer',
  url: 'https://rezaghamar.ir',
  sameAs: ['https://github.com/R3za22'],
};

export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>[number];
export type TimelineItem = z.infer<typeof timelineSchema>[number];
