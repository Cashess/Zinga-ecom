import React, { useState } from 'react';
import { ChefHat, Clock, Users, Flame, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { generateGingerRecipe, Recipe } from '../services/geminiService';
import { Link } from 'react-router-dom';

const Recipes: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [dietary, setDietary] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setLoading(true);
    setError('');
    setRecipe(null);

    try {
      const result = await generateGingerRecipe(ingredients, dietary);
      setRecipe(result);
    } catch (err) {
      setError('Our AI chef is having a moment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinga-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-zinga-100 mb-4">
            <ChefHat size={48} className="text-zinga-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinga-900 mb-4">Zinga AI Kitchen</h1>
          <p className="text-xl text-zinga-700 max-w-2xl mx-auto">
            Not sure what to cook? Tell our AI Chef what ingredients you have, and we'll craft the perfect ginger-infused recipe for you.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 border border-zinga-100">
          <div className="p-8 md:p-10">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-zinga-900 mb-2">What's in your pantry?</label>
                <textarea
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g., Chicken breast, rice, coconut milk, carrots..."
                  className="w-full p-4 border border-zinga-200 rounded-xl focus:ring-2 focus:ring-zinga-500 focus:outline-none min-h-[120px] text-lg bg-zinga-50/50"
                  required
                />
              </div>
              
              <div>
                <label className="block text-lg font-bold text-zinga-900 mb-2">Dietary Preferences (Optional)</label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full p-4 border border-zinga-200 rounded-xl focus:ring-2 focus:ring-zinga-500 focus:outline-none bg-white"
                >
                  <option value="">None</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Keto">Keto</option>
                  <option value="Paleo">Paleo</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading || !ingredients}
                className={`w-full py-5 bg-gradient-to-r from-zinga-600 to-zinga-700 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 ${
                  loading || !ingredients ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Creating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles /> Generate Recipe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {error && (
          <div className="p-6 bg-red-50 text-red-600 rounded-xl text-center font-medium border border-red-100">
            {error}
          </div>
        )}

        {recipe && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-zinga-100 animate-fade-in">
            <div className="bg-zinga-900 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                <ChefHat size={200} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 relative z-10">{recipe.title}</h2>
              <p className="text-zinga-100 text-lg relative z-10 max-w-2xl">{recipe.description}</p>
              
              <div className="flex flex-wrap gap-4 mt-6 relative z-10">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Clock size={18} />
                  <span className="font-bold">{recipe.prepTime} Prep</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Flame size={18} />
                  <span className="font-bold">{recipe.cookTime} Cook</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Users size={18} />
                  <span className="font-bold">{recipe.servings}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <span className="font-bold uppercase tracking-wide text-sm">{recipe.difficulty}</span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10 grid md:grid-cols-3 gap-10">
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-zinga-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-zinga-100 text-zinga-600 flex items-center justify-center text-sm">1</span>
                  Ingredients
                </h3>
                <ul className="space-y-3">
                  {recipe.ingredients.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinga-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinga-400 mt-2.5 flex-shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 p-6 bg-zinga-50 rounded-xl border border-zinga-100">
                  <p className="font-bold text-zinga-900 mb-2">Need Zinga?</p>
                  <p className="text-sm text-zinga-600 mb-4">The key to this recipe's flavor.</p>
                  <Link to="/products" className="block w-full text-center py-2 bg-zinga-600 text-white rounded-lg font-bold text-sm hover:bg-zinga-700 transition-colors">
                    Shop Ginger
                  </Link>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-zinga-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-zinga-100 text-zinga-600 flex items-center justify-center text-sm">2</span>
                  Instructions
                </h3>
                <div className="space-y-6">
                  {recipe.instructions.map((step, i) => (
                    <div key={i} className="group">
                      <h4 className="font-bold text-zinga-800 mb-2 group-hover:text-zinga-600 transition-colors">Step {i + 1}</h4>
                      <p className="text-gray-600 leading-relaxed text-lg">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;