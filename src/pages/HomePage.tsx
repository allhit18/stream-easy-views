
import { Link } from "react-router-dom";
import { videos } from "@/data/videos";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
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
          {videos.map((video) => (
            <Link to={`/video/${video.id}`} key={video.id} className="rounded-lg bg-white shadow group hover:shadow-lg transition p-3 flex flex-col">
              <img src={video.thumbnailUrl} alt={video.title} className="aspect-video rounded mb-3 object-cover" />
              <div className="font-semibold text-lg text-purple-800 group-hover:text-purple-900">{video.title}</div>
              <div className="text-gray-500 text-sm">{video.category}</div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
