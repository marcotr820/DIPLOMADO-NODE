
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res ,next) {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if (!token) {
      return res.sendStatus(401);
   }

   jwt.verify(token, "secreto123", (err, user) => {
      if (err) {
         return res.sendStatus(403)
      }

      console.log(user);
      req.user = user;
      next();
   })

}