import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { router as authRoutes } from './routes/auth.routes.js';
import { router as messageRoutes } from './routes/message.routes.js';
import { router as userRoutes } from './routes/user.routes.js';
import connectToDatabase from './db/connectToDatabase.js';
import cookieParser from 'cookie-parser';
import { app ,server} from './socket.io/socket.js';


dotenv.config();
console.log();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://chat-frontend-ad9z.vercel.app', 
  methods: ['GET', 'POST'],
  credentials: true, 
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Connect to database
connectToDatabase();

// const __dirname = path.resolve();
// Route handling
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/messages', messageRoutes); // Message routes
app.use('/api/user', userRoutes); // User routes

app.use(express.static(path.join(__dirname ,"/fronted/dist")));


// app.get("*" ,(req,res)=>{
//   res.sendFile(path.join(__dirname ,"frontend", "dist", "index.html"));
// })

// Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

