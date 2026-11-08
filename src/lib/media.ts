import type { ImageMetadata } from 'astro';

// Screenshots live under src/assets/projects/<slug>/. Astro optimises them.
const assets = import.meta.glob<{ default: ImageMetadata }>('/src/assets/projects/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
});

export interface Shot {
  image: ImageMetadata;
  alt: string;
}

// Keeps only image entries whose file exists, so a bad path fails loudly in tests.
export function shotsOf(media: { type: 'video' | 'image'; src: string; alt: string }[] | undefined): Shot[] {
  return (media ?? []).flatMap((item) => {
    if (item.type !== 'image') return [];
    const found = assets[`/src/assets/${item.src}`];
    return found ? [{ image: found.default, alt: item.alt }] : [];
  });
}
