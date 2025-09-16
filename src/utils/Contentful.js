export async function fetchBlogPosts() {
  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID?.trim();
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN?.trim();

  // Debug logs
  console.log('Contentful Config Debug:', {
    spaceIdValue: SPACE_ID?.substring(0, 4) + '...',
    spaceIdLength: SPACE_ID?.length,
    tokenExists: !!ACCESS_TOKEN,
    envMode: import.meta.env.MODE
  });

  if (!SPACE_ID || SPACE_ID.length < 10) {
    throw new Error("Invalid Contentful Space ID");
  }

  if (!ACCESS_TOKEN || ACCESS_TOKEN.length < 40) {
    throw new Error("Invalid Contentful Access Token");
  }

  try {
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

    // Procesar los assets (imágenes)
    const assets = {};
    if (data.includes?.Asset) {
      data.includes.Asset.forEach((asset) => {
        assets[asset.sys.id] = asset.fields.file.url.startsWith("http")
          ? asset.fields.file.url
          : `https:${asset.fields.file.url}`;
      });
    }

    // Mapear los items a nuestro formato
    return data.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.title,
      excerpt: item.fields.body?.content?.[0]?.content?.[0]?.value || "",
      content: item.fields.body,
      image: item.fields.featuredImage ? assets[item.fields.featuredImage.sys.id] : "",
      date: item.fields.publishDate,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}