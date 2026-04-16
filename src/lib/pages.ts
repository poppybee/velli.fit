import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'pages.json');

export type HeroConfig = {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

export type CategoryConfig = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
};

export type BrandStoryConfig = {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

export type BannerConfig = {
  id: string;
  image: string;
  title: string;
  link: string;
};

export type PagesData = {
  home: {
    hero: HeroConfig;
    categories: CategoryConfig[];
    brandStory: BrandStoryConfig;
  };
  product: {
    banners: BannerConfig[];
  };
};

export function getPagesData(): PagesData {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {
      home: {
        hero: { image: '', title: '', subtitle: '', buttonText: '', buttonLink: '' },
        categories: [],
        brandStory: { image: '', title: '', subtitle: '', buttonText: '', buttonLink: '' },
      },
      product: { banners: [] },
    };
  }
}

export function savePagesData(data: PagesData): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
