
import { videos, Video } from "@/data/videos";

// Helper: paginate an array
function paginate<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const pageCount = Math.ceil(total / perPage);
  const safePage = Math.max(1, Math.min(page, pageCount));
  const start = (safePage - 1) * perPage;
  const results = items.slice(start, start + perPage);
  return {
    data: results,
    pagination: {
      total,
      page: safePage,
      perPage,
      pageCount
    },
  };
}

// GET /api/videos/latest?page=X&perPage=Y
export async function getLatestVideos(page = 1, perPage = 10) {
  // Optionally sort by uploadDate descending here if required
  const sorted = [...videos].sort((a, b) => b.uploadDate.localeCompare(a.uploadDate));
  return paginate(sorted, page, perPage);
}

// GET /api/videos/category/:category?page=X&perPage=Y
export async function getVideosByCategory(category: string, page = 1, perPage = 10) {
  const filtered = videos.filter(v => v.category === category);
  return paginate(filtered, page, perPage);
}

// GET /api/videos/:category/:id
export async function getVideoById(category: string, id: string) {
  const video = videos.find(v => v.category === category && v.id === id);
  if (!video) {
    throw new Error("Video not found");
  }
  return video;
}

// GET /api/categories
export async function getCategories(): Promise<string[]> {
  // Unique category names from the videos list
  return Array.from(new Set(videos.map(v => v.category)));
}
