import { describe, it, expect } from 'vitest';
import { projectSchema } from '../../src/lib/schema';

const base = {
  name: 'Mizan',
  tagline: 'Tagline',
  role: 'Developer',
  status: 'production',
  team: false,
  stack: ['TypeScript'],
  links: {},
  order: 1,
  featured: false,
};

describe('projectSchema demo fields', () => {
  it('accepts a root-relative demo path with a demo note and media', () => {
    const result = projectSchema.safeParse({
      ...base,
      links: { demo: '/demos/mizan/' },
      demoNote: 'Runs on a static copy of the app.',
      media: [{ type: 'video', src: '/media/mizan.mp4', alt: 'Mizan walkthrough' }],
    });
    expect(result.success).toBe(true);
  });

  it('rejects a demo value that is neither a URL nor a root-relative path', () => {
    const result = projectSchema.safeParse({ ...base, links: { demo: 'mizan' } });
    expect(result.success).toBe(false);
  });
});
