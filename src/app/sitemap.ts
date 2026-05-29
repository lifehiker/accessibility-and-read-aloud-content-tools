import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://accessitools.app";

  const routes = [
    "",
    "/pricing",
    "/login",
    "/signup",
    "/alt-text-generator",
    "/alt-text-generator-for-ecommerce",
    "/bulk-alt-text-generator-for-images",
    "/alt-text-generator-for-instagram",
    "/read-pdf-aloud",
    "/read-screenshots-aloud",
    "/text-to-speech-reader-no-subscription",
    "/tools/image-alt-text-generator",
    "/tools/pdf-to-speech",
    "/compare/speechify-alternative",
    "/compare/naturalreader-alternative",
    "/compare/canva-alt-text-alternative",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/tools") ? 0.9 : 0.8,
  }));
}
