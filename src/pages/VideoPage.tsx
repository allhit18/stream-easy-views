
import { useParams, Link, Navigate } from "react-router-dom";
import { videos } from "@/data/videos";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";

function getVideoById(id: string) {
  return videos.find((v) => v.id === id);
}

function getRelatedVideos(category: string, id: string) {
  return videos.filter((v) => v.category === category && v.id !== id).slice(0, 3);
}

export default function VideoPage() {
  const { id } = useParams();
  const video = id ? getVideoById(id) : null;

  if (!video) return <Navigate to="/" />;

  const related = getRelatedVideos(video.category, video.id);

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
      logo: "https://lovable.dev/opengraph-image-p98pqg.png"
    }
  };

  return (
    <>
      <Helmet>
        <title>{video.title} - StreamEasy</title>
        <meta name="description" content={video.description} />
        <meta name="keywords" content={`${video.title}, ${video.category}, video`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-2 max-w-3xl">
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <h1 className="text-2xl font-bold mb-2 text-purple-900">{video.title}</h1>
          <p className="text-gray-600 mb-4">{video.description}</p>
          <video controls className="w-full rounded mb-2" poster={video.thumbnailUrl}>
            <source src={video.contentUrl} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
          <div className="flex items-center gap-4 mb-2">
            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded">{video.category}</span>
            <span className="text-gray-400 text-xs">{video.uploadDate}</span>
          </div>
        </div>
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-purple-800">Related Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((relVideo) => (
                <Link to={`/video/${relVideo.id}`} key={relVideo.id} className="flex gap-3 items-center bg-gray-50 rounded hover:bg-gray-100 p-2 transition">
                  <img src={relVideo.thumbnailUrl} alt={relVideo.title} className="w-24 aspect-video object-cover rounded" />
                  <div>
                    <div className="font-medium text-purple-800">{relVideo.title}</div>
                    <div className="text-xs text-gray-500">{relVideo.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
