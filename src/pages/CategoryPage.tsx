
import { useParams, Link, Navigate, useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { getVideosByCategory } from "@/api/mockApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const VIDEOS_PER_PAGE = 3;

export default function CategoryPage() {
  const { categoryName } = useParams();
  const decodedCategory = categoryName ? decodeURIComponent(categoryName) : "";

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const { data, isLoading, error } = useQuery({
    queryKey: ["categoryVideos", decodedCategory, page],
    queryFn: () => getVideosByCategory(decodedCategory, page, VIDEOS_PER_PAGE),
    enabled: !!decodedCategory,
    keepPreviousData: true,
  });

  if (!decodedCategory || error) {
    return <Navigate to="/" />;
  }
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{decodedCategory} Videos - StreamEasy</title>
        </Helmet>
        <Navbar />
        <main className="container mx-auto px-2">
          <h2 className="text-2xl font-bold mb-6 text-purple-800">
            {decodedCategory} Videos
          </h2>
          <div className="text-center py-16 text-gray-400">Loading...</div>
        </main>
      </>
    );
  }
  if (data?.data.length === 0) {
    return <Navigate to="/" />;
  }

  const videos = data?.data || [];
  const pageCount = data?.pagination?.pageCount || 1;
  const safePage =
    !Number.isNaN(page) && page > 0 && page <= pageCount ? page : 1;

  // Handlers
  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return;
    navigate(`/category/${encodeURIComponent(decodedCategory)}?page=${newPage}`);
  };

  return (
    <>
      <Helmet>
        <title>{decodedCategory} Videos - StreamEasy</title>
        <meta
          name="description"
          content={`Browse ${decodedCategory} videos on StreamEasy.`}
        />
        <meta
          name="keywords"
          content={`${decodedCategory}, video streaming, StreamEasy`}
        />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-2">
        <h2 className="text-2xl font-bold mb-6 text-purple-800">
          {decodedCategory} Videos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link
              to={`/video/${video.id}`}
              key={video.id}
              className="rounded-lg bg-white shadow hover:shadow-lg transition p-3 flex flex-col group"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="aspect-video rounded mb-3 object-cover"
              />
              <div className="font-semibold text-lg text-purple-800 group-hover:text-purple-900">
                {video.title}
              </div>
              <div className="text-gray-500 text-sm">{video.uploadDate}</div>
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
      </main>
    </>
  );
}
