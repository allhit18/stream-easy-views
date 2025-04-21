
export type Video = {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl: string;
};

export const videos: Video[] = [
  {
    id: "1",
    title: "React Crash Course",
    description: "Learn React.js in 30 minutes with this crash course!",
    category: "Programming",
    thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    uploadDate: "2024-03-12",
    contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "2",
    title: "Node.js Express Tutorial",
    description: "Build a backend API using Node.js and Express quickly.",
    category: "Programming",
    thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    uploadDate: "2024-03-18",
    contentUrl: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: "3",
    title: "Yoga for Beginners",
    description: "A calming introduction yoga class for all flexibility levels.",
    category: "Lifestyle",
    thumbnailUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80",
    uploadDate: "2024-04-01",
    contentUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "4",
    title: "Simple Pasta Recipe",
    description: "Make delicious Italian pasta in under 15 minutes.",
    category: "Cooking",
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    uploadDate: "2024-04-10",
    contentUrl: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: "5",
    title: "Creative Drawing Techniques",
    description: "Take your drawing to the next level with these tricks.",
    category: "Art",
    thumbnailUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80",
    uploadDate: "2024-04-15",
    contentUrl: "https://www.w3schools.com/html/movie.mp4",
  },
];
