import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Project = CollectionEntry<'projects'>;

/** Entry ids are `<lang>/<slug>`; the URL slug drops the language prefix. */
export const slugOf = (project: Project) => project.id.replace(/^(en|fa)\//, '');

/** Placeholders are the whole value wrapped in square brackets (see CONTENT-TODO.md). */
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim());

/** Featured projects in one language, in display order. */
export function featuredFor(lang: Lang, projects: Project[]): Project[] {
  return projects
    .filter((project) => project.id.startsWith(`${lang}/`) && project.data.featured)
    .sort((a, b) => a.data.order - b.data.order);
}

/** One static path per featured project, with previous and next wrapping around. */
export function caseStudyPaths(lang: Lang, projects: Project[]) {
  const list = featuredFor(lang, projects);
  return list.map((project, i) => ({
    params: { slug: slugOf(project) },
    props: {
      project,
      prev: list[(i - 1 + list.length) % list.length],
      next: list[(i + 1) % list.length],
    },
  }));
}

/**
 * Splits a markdown body into the paragraph blocks under each `## ` heading.
 * Headings are dropped: the FA headings use Persian digits, so sections are
 * matched by position, never by heading text.
 */
export function sectionsOf(body: string): string[][] {
  const sections: string[][] = [];
  let current: string[] | undefined;
  for (const block of body.split(/\n\s*\n/)) {
    const [first, ...rest] = block.trim().split('\n');
    if (first === undefined || first === '') continue;
    if (first.startsWith('## ')) {
      current = [];
      sections.push(current);
      const remainder = rest.join('\n').trim();
      if (remainder) current.push(remainder);
      continue;
    }
    current?.push(block.trim());
  }
  return sections;
}

/** Splits a block on `**` markers into plain and bold runs. */
export function segmentsOf(text: string): { text: string; strong: boolean }[] {
  return text
    .split('**')
    .map((run, i) => ({ text: run, strong: i % 2 === 1 }))
    .filter((run) => run.text.length > 0);
}

/** A block that opens with a bold title, e.g. `**Offline-first by design.** Text...`. */
export function decisionOf(block: string): { title: string; text: string } | undefined {
  const match = /^\*\*(.+?)\*\*\s*([\s\S]*)$/.exec(block);
  if (!match) return undefined;
  return { title: match[1].replace(/[.:]\s*$/, ''), text: match[2].trim() };
}
