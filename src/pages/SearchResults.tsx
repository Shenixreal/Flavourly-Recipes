import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RecipeCard from '../components/ui/RecipeCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input'; // Make sure you have Input component
import { ChevronLeft, Search } from 'lucide-react';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
}

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialQuery = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'name';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Update the URL params when submitting new search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchParams({ q: searchQuery.trim(), type: searchType });
  };

  useEffect(() => {
    if (!initialQuery) return;

    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let apiUrl = '';
        if (searchType === 'ingredient') {
          apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(initialQuery)}`;
        } else {
          apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(initialQuery)}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        setError('Failed to fetch recipes. Please try again.');
        console.error('Error fetching recipes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [initialQuery, searchType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[var(--secondary)]">
            Search Results
          </h1>
          <p className="text-[var(--text)] mt-1">
            {searchType === 'ingredient' ? 'Recipes with' : 'Recipes for'} <span className="font-semibold">"{initialQuery}"</span>
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <form onSubmit={handleSearch} className="mb-6 max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="Search by ingredient or recipe name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="flex items-center justify-center gap-2 whitespace-nowrap">
            <Search className="w-5 h-5" />
            <span>Search</span>
          </Button>
        </div>
      </form>

      {isLoading && <LoadingSpinner message="Finding delicious recipes..." />}

      {error && (
        <EmptyState
          type="error"
          message="Don't fret! Something went wrong"
          description={error}
        />
      )}

      {!isLoading && !error && recipes.length === 0 && (
        <EmptyState
          type="empty"
          message="No recipes found"
          description={`Oops! We couldn't find any recipes ${searchType === 'ingredient' ? 'with' : 'for'} "${initialQuery}". Try a different search term!`}
        />
      )}

      {!isLoading && !error && recipes.length > 0 && (
        <>
          <p className="text-sm text-gray-600 mb-6">
            Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                id={recipe.idMeal}
                name={recipe.strMeal}
                image={recipe.strMealThumb}
                category={recipe.strCategory}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
