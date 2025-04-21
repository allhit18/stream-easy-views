
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { videos } from "@/data/videos";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext
} from "@/components/ui/pagination";
import { useMemo } from "react";

const VIDEOS_PER_PAGE = 3;

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") ?? "1", 10);

  // Pagination logic
  const pageCount = Math.ceil(videos.length / VIDEOS_PER_PAGE);
  const safePage = !Number.isNaN(page) && page > 0 && page <= pageCount ? page : 1;
  const startIdx = (safePage - 1) * VIDEOS_PER_PAGE;
  const paginatedVideos = useMemo(() => videos.slice(startIdx, startIdx + VIDEOS_PER_PAGE), [startIdx]);

  // Handlers
  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return;
    navigate(`/?page=${newPage}`);
  };

  return (
    <>
      <Helmet>
        <title>StreamEasy - Latest Videos</title>
        <meta name="description" content="Watch the latest videos on StreamEasy across Programming, Lifestyle, Cooking, Art, and more." />
        <meta name="keywords" content="video streaming, React, tutorial, programming, lifestyle, cooking, art" />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-2">
        <h2 className="text-3xl font-bold text-center mb-6">Latest Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedVideos.map((video) => (
            <Link to={`/video/${video.id}`} key={video.id} className="rounded-lg bg-white shadow group hover:shadow-lg transition p-3 flex flex-col">
              <img src={video.thumbnailUrl} alt={video.title} className="aspect-video rounded mb-3 object-cover" />
              <div className="font-semibold text-lg text-purple-800 group-hover:text-purple-900">{video.title}</div>
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
                  className={`h-9 w-9 flex items-center justify-center rounded ${safePage === i + 1 ? "bg-purple-200 font-bold" : "hover:bg-purple-50"}`}
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
      </main>
    </>
  );
}
