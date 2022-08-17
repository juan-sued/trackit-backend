import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

import usersRoutes from './routes/usersRoutes.js';

const server = express();

server.use(cors());
server.use(express.json());

server.use(usersRoutes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(chalk.cyan('Servidor rodando na porta ' + PORT));
});
