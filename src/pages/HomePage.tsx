
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { getLatestVideos } from "@/api/mockApi";
import { Video } from "@/data/videos";

const VIDEOS_PER_PAGE = 3;

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") ?? "1", 10);

  // Fetch videos using the API with proper type definition
  const { data, isLoading, error } = useQuery<{
    data: Video[];
    pagination: { total: number; page: number; perPage: number; pageCount: number };
  }>({
    queryKey: ["latestVideos", page],
    queryFn: () => getLatestVideos(page, VIDEOS_PER_PAGE),
    placeholderData: (prev) => prev,
  });

  const paginatedVideos = data?.data || [];
  const pageCount = data?.pagination?.pageCount || 1;
  const safePage =
    !Number.isNaN(page) && page > 0 && page <= pageCount ? page : 1;

  // Handlers
  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return;
    navigate(`/?page=${newPage}`);
  };

  return (
    <>
      <Helmet>
        <title>StreamEasy - Latest Videos</title>
        <meta
          name="description"
          content="Watch the latest videos on StreamEasy across Programming, Lifestyle, Cooking, Art, and more."
        />
        <meta
          name="keywords"
          content="video streaming, React, tutorial, programming, lifestyle, cooking, art"
        />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-2">
        <h2 className="text-3xl font-bold text-center mb-6">Latest Videos</h2>
        {isLoading ? (
          <div className="text-center py-12 text-lg text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">Failed to load videos.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedVideos.map((video) => (
                <Link
                  to={`/video/${video.id}`}
                  key={video.id}
                  className="rounded-lg bg-white shadow group hover:shadow-lg transition p-3 flex flex-col"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="aspect-video rounded mb-3 object-cover"
                  />
                  <div className="font-semibold text-lg text-purple-800 group-hover:text-purple-900">
                    {video.title}
                  </div>
                  <div className="text-gray-500 text-sm">{video.category}</div>
                </Link>
              ))}
            </div>
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => goToPage(safePage - 1)}
                    tabIndex={safePage === 1 ? -1 : 0}
                    aria-disabled={safePage === 1}
                    className={safePage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {[...Array(pageCount)].map((_, i) => (
                  <PaginationItem key={i + 1}>
                    <button
                      onClick={() => goToPage(i + 1)}
                      className={`h-9 w-9 flex items-center justify-center rounded ${
                        safePage === i + 1
                          ? "bg-purple-200 font-bold"
                          : "hover:bg-purple-50"
                      }`}
                      aria-current={safePage === i + 1 ? "page" : undefined}
                      type="button"
                    >
                      {i + 1}
                    </button>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => goToPage(safePage + 1)}
                    tabIndex={safePage === pageCount ? -1 : 0}
                    aria-disabled={safePage === pageCount}
                    className={safePage === pageCount ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </main>
    </>
  );
}
