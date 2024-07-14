import logger from "../logs/logger.js"
import bcrypt from "bcrypt";

export const encriptar = async (texto) => {
   try {
      const saltRound = +process.env.BCRYPT_SALT_ROUNDS;
      return await bcrypt.hash(texto, saltRound);
   } catch (error) {
      logger.error(error.message);
      throw new error('Error al encryptar');
   }
}

export const comparar = async (text, hash) => {
   
   try {
      return await bcrypt.compare(text, hash);
   } catch (error) {
      logger.error(error.message);
      throw new error('Error al comparar hash');
   }
}