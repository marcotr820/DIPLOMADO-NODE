import { DataTypes } from "sequelize";
import { Status } from "../constants/index.js";
import { sequelize } from "../database/database.js";
import { Task } from "./task.js";
import { encriptar } from "../common/bcrypt.js";

export const User = sequelize.define('users', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
         notNull: { msg: 'Ingrese nombre de usuario' }
      }
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notNull: { msg: 'Ingrese password' }
      }
   },
   status: {
      type: DataTypes.STRING,
      defaultValue: Status.ACTIVE,
      validate: {
         isIn: {
            args: [[Status.ACTIVE, Status.INACTIVE]],
            msg: `Deve ser ${Status.ACTIVE} o ${Status.INACTIVE}`
         }
      }
   }
});

User.hasMany(Task);
Task.belongsTo(User);

User.beforeCreate(async (user) => {
   try {
      user.password = await encriptar(user.password);
   } catch (error) {
      logger.error(error.message);
      throw new error('Error al encryptar password');
   }
});

User.beforeUpdate(async (user) => {
   try {
      user.password = await encriptar(user.password);
   } catch (error) {
      logger.error(error.message);
      throw new error('Error al encryptar password');
   }
});