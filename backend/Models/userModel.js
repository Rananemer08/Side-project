import sequelize from "../Config/connection.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userType: {
    type: DataTypes.ENUM('Creator', 'viewer'),
    allowNull: false,
  },
//   isAdmin: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false,
//   },
  // confirmedByAdmin: {
  //   type: DataTypes.BOOLEAN,
  //   defaultValue: false,
  // },
});

export default User;

