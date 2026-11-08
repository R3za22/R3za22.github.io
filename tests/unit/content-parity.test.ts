import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { projectSchema, skillSchema, timelineSchema } from '../../src/lib/schema';

const root = fileURLToPath(new URL('../..', import.meta.url));
const projectsDir = path.join(root, 'src/content/projects');
const langs = ['en', 'fa'] as const;

const slugs = (lang: string) =>
  fs
    .readdirSync(path.join(projectsDir, lang))
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
    .sort();

const readFront = (lang: string, slug: string) => {
  const raw = fs.readFileSync(path.join(projectsDir, lang, `${slug}.md`), 'utf8');
  return matter(raw).data;
};

const readJson = (name: string) =>
  JSON.parse(fs.readFileSync(path.join(root, 'src/data', name), 'utf8')) as unknown[];

const PARITY_FIELDS = ['stack', 'links', 'order', 'featured', 'status', 'team', 'early'] as const;

describe('projects content parity', () => {
  it('has the same slugs in en and fa', () => {
    expect(slugs('fa')).toEqual(slugs('en'));
    expect(slugs('en').length).toBeGreaterThan(0);
  });

  for (const slug of slugs('en')) {
    describe(slug, () => {
      it('has an fa twin that shares stack, links, order, featured, status and team', () => {
        const en = readFront('en', slug);
        const fa = readFront('fa', slug);
        for (const field of PARITY_FIELDS) {
          expect(fa[field], field).toEqual(en[field]);
        }
      });

      it('validates against the shared schema in both languages', () => {
        for (const lang of langs) {
          const result = projectSchema.safeParse(readFront(lang, slug));
          expect(result.success, `${lang}/${slug}: ${JSON.stringify(result.error?.issues)}`).toBe(true);
        }
      });
    });
  }
});

describe('skills and timeline parity', () => {
  it('skills.en.json and skills.fa.json have the same length', () => {
    expect(readJson('skills.fa.json').length).toBe(readJson('skills.en.json').length);
  });

  it('timeline.en.json and timeline.fa.json have the same length', () => {
    expect(readJson('timeline.fa.json').length).toBe(readJson('timeline.en.json').length);
  });

  it('skills files validate against the shared schema', () => {
    for (const name of ['skills.en.json', 'skills.fa.json']) {
      expect(skillSchema.safeParse(readJson(name)).success, name).toBe(true);
    }
  });

  it('timeline files validate against the shared schema', () => {
    for (const name of ['timeline.en.json', 'timeline.fa.json']) {
      expect(timelineSchema.safeParse(readJson(name)).success, name).toBe(true);
    }
  });
});
