
import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { getVideoById, getVideosByCategory } from "@/api/mockApi";
import { Video } from "@/data/videos";

export default function VideoPage() {
  const { id } = useParams();

  // Step 1: Get the video, searching all categories (since we don't have direct category/id routing)
  const {
    data: video,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["videoDetail", id],
    queryFn: async () => {
      // Try to find the video in all categories
      const allCategories = (await import("@/data/videos")).videos.map((v) => v.category);
      const uniqueCategories = Array.from(new Set(allCategories));
      let found = null;
      for (const cat of uniqueCategories) {
        try {
          found = await getVideoById(cat, id!);
          if (found) break;
        } catch {}
      }
      if (!found) throw new Error("Video not found");
      return found;
    },
    enabled: !!id,
  });

  // Step 2: Get related videos by category (excluding this video)
  const {
    data: relatedData,
    isLoading: relatedLoading,
  } = useQuery({
    queryKey: ["relatedVideos", video?.category, id],
    queryFn: () =>
      video
        ? getVideosByCategory(video.category, 1, 4).then((res) =>
            res.data.filter((v) => v.id !== id).slice(0, 3)
          )
        : Promise.resolve([]),
    enabled: !!video,
  });

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading video... - StreamEasy</title>
        </Helmet>
        <Navbar />
        <main className="container mx-auto px-2 max-w-3xl">
          <div className="py-16 text-center text-gray-400">Loading...</div>
        </main>
      </>
    );
  }

  if (error || !video) return <Navigate to="/" />;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    contentUrl: video.contentUrl,
    publisher: {
      "@type": "Organization",
      name: "StreamEasy",
      logo: "https://lovable.dev/opengraph-image-p98pqg.png",
    },
  };

  return (
    <>
      <Helmet>
        <title>{video.title} - StreamEasy</title>
        <meta name="description" content={video.description} />
        <meta
          name="keywords"
          content={`${video.title}, ${video.category}, video`}
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-2 max-w-3xl">
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <h1 className="text-2xl font-bold mb-2 text-purple-900">
            {video.title}
          </h1>
          <p className="text-gray-600 mb-4">{video.description}</p>
          <video
            controls
            className="w-full rounded mb-2"
            poster={video.thumbnailUrl}
          >
            <source src={video.contentUrl} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
          <div className="flex items-center gap-4 mb-2">
            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded">
              {video.category}
            </span>
            <span className="text-gray-400 text-xs">{video.uploadDate}</span>
          </div>
        </div>
        {relatedData && relatedData.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-purple-800">
              Related Videos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedData.map((relVideo) => (
                <Link
                  to={`/video/${relVideo.id}`}
                  key={relVideo.id}
                  className="flex gap-3 items-center bg-gray-50 rounded hover:bg-gray-100 p-2 transition"
                >
                  <img
                    src={relVideo.thumbnailUrl}
                    alt={relVideo.title}
                    className="w-24 aspect-video object-cover rounded"
                  />
                  <div>
                    <div className="font-medium text-purple-800">
                      {relVideo.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {relVideo.category}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {relatedLoading && (
          <div className="py-6 text-gray-400 text-center">Loading related videos...</div>
        )}
      </main>
    </>
  );
}
