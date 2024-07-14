import express from 'express';
import morgan from 'morgan';

const app = express();

//import ROUTES
import usersRoutes from './routes/users.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import authRoutes from './routes/auth.routes.js';
import { authenticateToken } from './middlewares/authenticate.middleware.js';

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//ROUTES
app.use('/api/users', usersRoutes);
app.use('/api/tasks', authenticateToken, tasksRoutes);
app.use('/api/login', authRoutes)

export default app;