/**
 * Performance optimization utilities to preload heavy assets.
 */

const IMAGES_TO_PRELOAD = [
  // Brand Logo & Core Backgrounds
  "/images/logo.png",
  "/images/hero-800.webp",
  
  // Projects Section
  "https://i.postimg.cc/SsKV6WTb/Dubourthoumieu.jpg",
  "https://i.postimg.cc/mgBF0TQ0/Millions-of-women-around-the-world-work-growing.jpg",
  "https://i.postimg.cc/8CrD46j4/623326404723130922.jpg",
  
  // Team Section
  "https://i.postimg.cc/xdG7Npbx/IMG-20260612-WA0097.jpg",
  "https://i.postimg.cc/bNM47thb/IMG-20260612-WA0099.jpg",
  "https://i.postimg.cc/90QvhP0n/IMG-20260612-WA0098.jpg",
  
  // High-Resolution Unsplash Heroes
  "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=2000&auto=format&fit=crop&fm=webp",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop&fm=webp",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000&auto=format&fit=crop&fm=webp",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop&fm=webp",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2000&auto=format&fit=crop&fm=webp",
  "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1000&auto=format&fit=crop&fm=webp"
];

/**
 * Preload all images into the browser cache.
 * Executes on idle or deferred timeframe to prioritize content rendering.
 */
export function preloadAllImages() {
  if (typeof window === "undefined") return;

  const runPreload = () => {
    IMAGES_TO_PRELOAD.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(runPreload);
  } else {
    setTimeout(runPreload, 250);
  }
}

/**
 * Pre-import code split page chunks to eliminate dynamic layout shifts or suspense fallback spinners
 * when navigating between pages.
 * (Disabled for Lighthouse load-time optimization)
 */
export function preloadAllPages() {
  // Page preloading disabled to optimize initial load bundle splitting
}
