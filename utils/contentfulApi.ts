import { Document } from '@contentful/rich-text-types';

export type Category = "Opinión" | "Release" | "Bugs" | "Comunicados";
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: Document;
  date: string;
  image?: string;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID?.trim();
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN?.trim();

  if (!SPACE_ID || SPACE_ID.length < 10) {
    throw new Error("Invalid Contentful Space ID");
  }

  if (!ACCESS_TOKEN || ACCESS_TOKEN.length < 40) {
    throw new Error("Invalid Contentful Access Token");
  }

  const res = await fetch(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=blog&order=-fields.publishDate`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Contentful fetch error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  const assets: Record<string, string> = {};
  if (data.includes?.Asset) {
    data.includes.Asset.forEach((asset: any) => {
      assets[asset.sys.id] = asset.fields.file.url.startsWith("http")
        ? asset.fields.file.url
        : `https:${asset.fields.file.url}`;
    });
  }

  return data.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    excerpt: item.fields.body?.content?.[0]?.content?.[0]?.value || "",
    content: item.fields.body,
    image: item.fields.featuredImage ? assets[item.fields.featuredImage.sys.id] : "",
    date: item.fields.publishDate,
  }));
}