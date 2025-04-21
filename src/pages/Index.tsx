
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";
import VideoPage from "./VideoPage";
import NotFound from "./NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Index = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);

export default Index;
