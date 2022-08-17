import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

import authRoutes from './routes/authRoutes.js';
import habitsRoutes from './routes/habitsRoutes.js';
const server = express();

server.use(cors());
server.use(express.json());

server.use(authRoutes, habitsRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(chalk.cyan('Servidor rodando na porta ' + PORT));
});
