
import { useParams, Link, Navigate } from "react-router-dom";
import { videos } from "@/data/videos";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const decodedCategory = categoryName ? decodeURIComponent(categoryName) : "";
  const categoryVideos = videos.filter((v) => v.category === decodedCategory);

  if (!categoryVideos.length) {
    // Redirect to home if invalid category (could show a 404 instead)
    return <Navigate to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>{decodedCategory} Videos - StreamEasy</title>
        <meta name="description" content={`Browse ${decodedCategory} videos on StreamEasy.`} />
        <meta name="keywords" content={`${decodedCategory}, video streaming, StreamEasy`} />
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-2">
        <h2 className="text-2xl font-bold mb-6 text-purple-800">{decodedCategory} Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoryVideos.map((video) => (
            <Link to={`/video/${video.id}`} key={video.id} className="rounded-lg bg-white shadow hover:shadow-lg transition p-3 flex flex-col group">
              <img src={video.thumbnailUrl} alt={video.title} className="aspect-video rounded mb-3 object-cover" />
              <div className="font-semibold text-lg text-purple-800 group-hover:text-purple-900">{video.title}</div>
              <div className="text-gray-500 text-sm">{video.uploadDate}</div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
