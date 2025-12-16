/**
 * Optimizes Unsplash image URLs by adjusting query parameters for size and quality.
 * Provides a default fallback image if the URL is missing.
 * @param url The original image URL
 * @param width The desired width in pixels
 * @param quality The desired quality (1-100)
 * @returns The optimized image URL
 */
export const getOptimizedImageUrl = (
  url: string | undefined | null,
  width: number,
  quality: number = 80
): string => {
  // Fallback image (Cloudinary-hosted ginger product)
  const FALLBACK_IMAGE =
    "https://res.cloudinary.com/dts2hsdnj/image/upload/v1765877599/zinga/public/2000g_r2j2s1.png";

  if (!url || url.trim() === "") {
    return `https://res.cloudinary.com/dts2hsdnj/image/upload/q_${quality},w_${width},c_fill/zinga/public/2000g_r2j2s1.png`;
  }

  // ✅ Cloudinary image → inject transformations
  if (url.includes("res.cloudinary.com")) {
    return url.replace(
      "/upload/",
      `/upload/q_${quality},w_${width},c_fill/`
    );
  }

  // 🧓 Unsplash support (legacy, but respected)
  if (url.includes("images.unsplash.com")) {
    const baseUrl = url.split("?")[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=${quality}`;
  }

  // 🤷 Anything else (Stripe-hosted, external CDN, etc.)
  return url;
};
