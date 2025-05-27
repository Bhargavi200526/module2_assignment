import express from 'express';
import userRoutes from './routes/userRoutes';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);
app.use('/api', userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
