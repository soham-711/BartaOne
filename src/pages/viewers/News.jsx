import React, { useEffect, useState } from 'react';

// --- SVG Icons (Replacement for lucide-react) ---
const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Custom Carousel (Replacement for react-responsive-carousel) ---
const CustomCarousel = ({ children, autoPlay = true, interval = 4500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = React.Children.toArray(children);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const slideInterval = setInterval(next, interval);
    return () => clearInterval(slideInterval);
  }, [items.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((child, index) => (
          <div className="flex-shrink-0 w-full" key={index}>
            {child}
          </div>
        ))}
      </div>
       {/* Navigation Buttons */}
      <button onClick={prev} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition">
        &#10094;
      </button>
      <button onClick={next} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition">
        &#10095;
      </button>
       {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};


// --- Main App Component ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const liveNews = [
    {
      title: "Flood Alert in Assam",
      description: "Heavy rain causes flooding in 12 districts of Assam.",
      image: "https://i.ytimg.com/vi/9x48Ag-TtP8/maxresdefault.jpg"
    },
    {
      title: "Election Results 2025",
      description: "Live counting updates from key constituencies.",
      image: "https://images.indianexpress.com/2025/02/Feb1-64.jpg"
    },
    {
      title: "India Wins Cricket Final",
      description: "Historic win by India in the ICC tournament.",
      image: "https://i.ytimg.com/vi/-Vf0JbkPV6s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCFCxwcg5_5itK-YWxGHZq_DGi2MA"
    }
  ];

  // Placeholder for the logo import
  const logoUrl = "https://placehold.co/128x128/f97316/FFFFFF?text=B1&font=sans";

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={logoUrl} alt="Logo" className="w-12 h-12 rounded-full" />
            <span className="text-xl font-semibold text-orange-400 hidden sm:block">BartaOne News</span>
          </div>

          <nav className="hidden md:flex space-x-8 text-sm font-medium items-center">
            <a href="/dashboard" className="hover:text-orange-400 transition-colors">Home</a>
            <a href="#" className="hover:text-orange-400 transition-colors">News</a>
            <a href="#" className="hover:text-orange-400 flex items-center gap-1.5">
              Live <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
            </a>
            <a href="#">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full hover:shadow-lg transition">
                Sign In
              </button>
            </a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
            <div className="px-6 py-4 space-y-4 text-white">
              <a href="#" className="block hover:text-orange-400">Home</a>
              <a href="#" className="block hover:text-orange-400">News</a>
              <a href="#" className="block hover:text-orange-400">Live</a>
              <a href="#">
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full">
                  Sign In
                </button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Carousel Section */}
      <div className="pt-[80px]">
        <CustomCarousel>
          {liveNews.map((news, idx) => (
            <div key={idx} className="relative h-[420px] md:h-[500px]">
              <img src={news.image} alt={news.title} className="w-full h-full boject-fit" />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
                  {news.title}
                </h2>
                <p className="mt-4 text-lg md:text-xl max-w-2xl text-slate-300">{news.description}</p>
              </div>
            </div>
          ))}
        </CustomCarousel>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-orange-400">Never Miss Breaking News</h2>
          <p className="text-xl text-slate-300 mb-6">Subscribe for real-time alerts on regional and national updates tailored to your interests.</p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-white font-semibold rounded-full hover:scale-105 transition transform">
            Enable Notifications
          </button>
        </div>
      </section>
    </div>
  );
}
