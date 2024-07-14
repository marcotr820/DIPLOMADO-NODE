import { comparar } from "../common/bcrypt.js";
import logger from "../logs/logger.js";
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';

async function login(req, res) {
   try {
      const { username, password } = req.body;
      const user = await User.findOne({
         where: { username }
      });

      console.log(user);

      if (!user) {
         return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const credencialesCorrectas = await comparar(password, user.password);
      if (!credencialesCorrectas) {
         return res.status(403).json({ message: 'Credenciales no son correctas.' })
      }

      const token = jwt.sign({ userId: user.id }, 'secreto123', {
         expiresIn: 10000,
      });

      return res.json({ token });

   } catch (error) {
      logger.error(error.message);
      res.status(500).json({
         message: error.message
      });
   }
}

export default { login }