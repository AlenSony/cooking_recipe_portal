import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000 || process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cooking_recipe_portal';

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const recipeSchema = new mongoose.Schema({
    title: String,
    ingredients: String,
    instructions: String,
    cookingTime: String,
    difficulty: String,
    category: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.post('/api/recipes', async (req,res)=> {
    try{
        const {title, ingredients, instructions, cookingTime, difficulty, category} = req.body;
        const recipe = new Recipe({title, ingredients, instructions, cookingTime, difficulty, category});
        await recipe.save();
        console.log('Recipe added successfully');
        res.status(201).json(recipe);
    }
    catch(err){
        res.status(500).json({message: 'Error adding recipe'});
    }
});

app.get('/api/recipes', async (req,res)=> {
    try{
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    }
    catch(err){
        res.status(500).json({message: 'Error fetching recipes'});
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});