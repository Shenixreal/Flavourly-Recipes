import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { addFavorite, removeFavorite, isFavorite } from '../../utils/favorites';

interface RecipeCardProps {
  id: string;
  name: string;
  image: string;
  category?: string;
}

export default function RecipeCard({ id, name, image, category }: RecipeCardProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(id));
  }, [id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorited) removeFavorite(id);
    else addFavorite(id);
    setFavorited(!favorited);
  };

  return (
    <Link
      to={`/recipe/${id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group relative"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {category && (
          <span className="absolute top-3 left-3 bg-[var(--accent)] text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        )}

        {/* Heart button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-1 rounded-full shadow-md bg-white/80 hover:bg-white transition-colors"
          aria-label="Add to favorites"
        >
          <Heart
            size={20}
            className={`transition-colors duration-200 ${favorited ? 'text-red-500' : 'text-gray-400'}`}
            fill={favorited ? 'currentColor' : 'none'} // <-- fill the heart when favorited
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-[var(--secondary)] group-hover:text-[var(--primary)] transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  );
}
