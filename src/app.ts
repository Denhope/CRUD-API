import express from 'express';
import usersRoutes from './resources/users/routes';
import { notFoundHandler, errorHandler } from './errors';

const app = express();
app.use(express.json());

app.use('/api/users', usersRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
