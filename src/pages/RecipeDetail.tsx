import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Youtube, Globe, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favorites';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strTags?: string;
  strInstructions: string;
  strYoutube?: string;
  strSource?: string;
  [key: string]: string | undefined;
}

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (!id) return;

    setFavorited(isFavorite(id));

    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();

        if (data.meals && data.meals[0]) {
          setRecipe(data.meals[0]);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again.');
        console.error('Error fetching recipe:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleFavorite = () => {
    if (!id) return;

    if (favorited) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
    setFavorited(!favorited);
  };

  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient,
          measure: measure ? measure.trim() : ''
        });
      }
    }
    return ingredients;
  };

  if (isLoading) return <LoadingSpinner message="Loading recipe..." />;

  if (error || !recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Button>
        <EmptyState
          type="error"
          message={error || 'Recipe not found'}
          description="The recipe you're looking for doesn't exist. Try searching for another one!"
        />
      </div>
    );
  }

  const ingredients = getIngredients();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="secondary"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </Button>

      <h1 className="text-4xl sm:text-5xl font-bold text-[var(--secondary)] mb-4">
        {recipe.strMeal}
      </h1>

      <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
        {/* Badges- category, country or origins etc. */}
        <div className="flex flex-wrap gap-3">
          <span className="inline-block bg-[var(--accent)] text-white px-4 py-2 rounded-full text-sm font-medium">
            {recipe.strCategory}
          </span>
          <span className="inline-block bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm font-medium">
            {recipe.strArea}
          </span>
          {recipe.strTags && recipe.strTags.trim() !== '' && (
            <span className="inline-block bg-[var(--red)] text-white px-4 py-2 rounded-full text-sm font-medium">
              {recipe.strTags.split(',').join(', ')}
            </span>
          )}
        </div>

        {/* Favorites button */}
        <button
          onClick={toggleFavorite}
          aria-label="Add to favorites"
          className="p-2 rounded-full shadow-md bg-white/90 hover:bg-white transition-colors"
        >
          <Heart
            size={28}
            className={`transition-colors duration-200 ${
              favorited ? 'text-red-500 fill-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-96 object-cover rounded-xl mb-12 shadow-lg"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--secondary)] mb-6">
              Instructions
            </h2>
            <p className="text-[var(--text)] leading-relaxed whitespace-pre-wrap">
              {recipe.strInstructions}
            </p>
          </div>

          {(recipe.strYoutube || recipe.strSource) && (
            <div className="flex flex-wrap gap-4">
              {recipe.strYoutube && (
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  <Youtube className="w-5 h-5" />
                  Watch on YouTube
                </a>
              )}
              {recipe.strSource && (
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  <Globe className="w-5 h-5" />
                  View Source
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
            <h3 className="text-xl font-bold text-[var(--secondary)] mb-6">
              Ingredients
            </h3>
            <ul className="space-y-4">
              {ingredients.map((item, index) => (
                <li key={index} className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--primary)]"/>
                    <span className="text-[var(--text)]">
                      {item.ingredient}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                    {item.measure}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
