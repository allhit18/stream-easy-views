
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = ["Programming", "Lifestyle", "Cooking", "Art"];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="bg-white shadow px-4 py-2 flex items-center justify-between mb-8">
      <div>
        <Link to="/" className="text-xl font-bold text-purple-700 hover:text-purple-900 transition-colors">
          StreamEasy
        </Link>
      </div>
      <div className="flex gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${encodeURIComponent(cat)}`}
            className={cn(
              "text-sm font-medium px-3 py-1 rounded",
              pathname.startsWith(`/category/${cat}`) ? "bg-purple-100 text-purple-800" : "hover:bg-purple-50"
            )}
          >
            {cat}
          </Link>
        ))}
      </div>
    </nav>
  );
}
