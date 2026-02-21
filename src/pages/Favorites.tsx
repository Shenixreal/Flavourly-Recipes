import { useState, useEffect } from 'react';
import RecipeCard from '../components/ui/RecipeCard';
import { getFavorites } from '../utils/favorites';
import { fetchMealById } from '../utils/api';

export default function Favorites() {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    async function loadFavorites() {
      const favIds = getFavorites();
      if (favIds.length === 0) return;

      const fetchedRecipes = await Promise.all(
        favIds.map(async (id: string) => {          // added explicit type
          const data = await fetchMealById(id);
          return data;
        })
      );

      setRecipes(fetchedRecipes);
    }

    loadFavorites();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-[var(--secondary)] mb-6">
        Your Favorites
      </h1>

      {recipes.length === 0 ? (
        <p className="text-[var(--text)]">You have no favorite recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      )}
    </div>
  );
}
