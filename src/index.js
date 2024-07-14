import app from "./app.js";
import 'dotenv/config';
import logger from './logs/logger.js';
import { sequelize } from "./database/database.js";

async function main() {
   await sequelize.sync({ force: false });
   const port = process.env.PORT
   app.listen(port);
   console.log(`escuchando el puerto: ${port}`);
   logger.info('hola info');
}

main();