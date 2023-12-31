import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const port = process.env.PORT || 5005;

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const corsOptions = {
    origin: "https://tiny-chef-front.onrender.com/",
}
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    // Serve static files from the 'frontend/dist' directory
    app.use(express.static('frontend/dist'));

    // Serve the React app's index.html for all other requests
    app.get('*', (req, res) => {res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
});
    
    
    // // Make dist folder a static folder
    // app.use(express.static(path.join(__dirname, 'frontend/dist')));
    // // Direct any route to load index.html in dist folder
    // app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
    app.get('/', (req, res) => res.send('Server is ready'));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

