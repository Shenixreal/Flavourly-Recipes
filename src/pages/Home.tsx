import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shuffle } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSurpriseMe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      );
      const data = await response.json();
      if (data.meals && data.meals[0]) {
        navigate(`/recipe/${data.meals[0].idMeal}`);
      }
    } catch (error) {
      console.error('Error fetching random recipe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/src/assets/hero-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Discover flavors you'll love
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
              Search hundreds of delicious recipes around the world and start cooking something amazing today.
            </p>

            {isLoading ? (
              <LoadingSpinner/>
            ) : (
              <>
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                    <Input
                      type="text"
                      placeholder="Search by ingredient or recipe name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      className="flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Search className="w-5 h-5" />
                      <span>Search</span>
                    </Button>
                  </div>
                </form>

                <div className="flex justify-center">
                  <Button
                    variant="secondary"
                    onClick={handleSurpriseMe}
                    className="
                      flex items-center gap-2
                      border-2 border-white
                      text-white
                      bg-white/10
                      hover:bg-white/20
                      backdrop-blur-sm
                      px-4 py-2
                    "
                  >
                    <Shuffle className="w-5 h-5" />
                    <span>Surprise Me</span>
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Cards */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[var(--primary)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[var(--white)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Search</h3>
              <p className="text-sm text-gray-600">
                Find recipes by name or ingredient in seconds
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[var(--red)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[var(--white)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Save Favorites</h3>
              <p className="text-sm text-gray-600">
                Keep track of recipes you love for later
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[var(--accent)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shuffle className="w-8 h-8 text-[var(--white)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Discover New</h3>
              <p className="text-sm text-gray-600">
                Try something new with our random recipe feature
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
