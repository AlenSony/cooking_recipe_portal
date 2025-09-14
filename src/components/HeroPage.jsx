import React, { useState } from 'react';
import './HeroPage.css';

const HeroPage = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]); // store fetched recipes
  const [recipeForm, setRecipeForm] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    difficulty: 'Easy',
    category: 'Main Course'
  });

  // Handle search request (GET)
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/recipes');
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();

      // Basic filtering (optional, since backend can handle queries too)
      const filtered = data.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setRecipes(filtered);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    }
  };

  // Handle add recipe request (POST)
  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeForm),
      });

      if (!response.ok) throw new Error('Failed to add recipe');
      const newRecipe = await response.json();

      console.log('Recipe added:', newRecipe);

      // Reset form after submission
      setRecipeForm({
        title: '',
        ingredients: '',
        instructions: '',
        cookingTime: '',
        difficulty: 'Easy',
        category: 'Main Course'
      });

      alert('Recipe added successfully ✅');
    } catch (err) {
      console.error('Error adding recipe:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="hero-page">
      <div className="hero-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Welcome
        </button>
        <h1 className="hero-title">The Kitchen Sketch</h1>
      </div>

      <div className="hero-content">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            🔍 Search Recipes
          </button>
          <button 
            className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            ➕ Add New Recipe
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'search' && (
            <div className="search-section">
              <form onSubmit={handleSearch} className="search-form">
                <div className="form-group">
                  <label htmlFor="searchQuery">What would you like to cook today?</label>
                  <input
                    type="text"
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for recipes, ingredients, or cuisines..."
                    className="search-input"
                  />
                </div>
                <button type="submit" className="search-button">
                  Search Recipes
                </button>
              </form>

              {/* Show fetched recipes */}
              <div className="recipe-results">
                {recipes.length > 0 ? (
                  recipes.map((r) => (
                    <div key={r._id} className="recipe-card">
                      <h3>{r.title}</h3>
                      <p><strong>Category:</strong> {r.category}</p>
                      <p><strong>Cooking Time:</strong> {r.cookingTime}</p>
                      <p><strong>Difficulty:</strong> {r.difficulty}</p>
                      <p><strong>Ingredients:</strong> {r.ingredients}</p>
                      <p><strong>Instructions:</strong> {r.instructions}</p>
                    </div>
                  ))
                ) : (
                  <p>No recipes found. Try another search.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <div className="add-recipe-section">
              <form onSubmit={handleAddRecipe} className="recipe-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title">Recipe Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={recipeForm.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Classic Apple Pie"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cookingTime">Cooking Time</label>
                    <input
                      type="text"
                      id="cookingTime"
                      name="cookingTime"
                      value={recipeForm.cookingTime}
                      onChange={handleInputChange}
                      placeholder="e.g., 45 minutes"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={recipeForm.category}
                      onChange={handleInputChange}
                    >
                      <option value="Main Course">Main Course</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Side Dish">Side Dish</option>
                      <option value="Beverage">Beverage</option>
                      <option value="Breakfast">Breakfast</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="difficulty">Difficulty</label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      value={recipeForm.difficulty}
                      onChange={handleInputChange}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="ingredients">Ingredients</label>
                  <textarea
                    id="ingredients"
                    name="ingredients"
                    value={recipeForm.ingredients}
                    onChange={handleInputChange}
                    placeholder="List each ingredient on a new line..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instructions">Instructions</label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    value={recipeForm.instructions}
                    onChange={handleInputChange}
                    placeholder="Write step-by-step cooking instructions..."
                    rows="6"
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  Save Recipe to Collection
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
