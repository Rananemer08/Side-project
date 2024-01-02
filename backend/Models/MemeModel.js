  import sequelize from "../Config/connection.js";
  import { DataTypes } from "sequelize";
  import User from "./userModel.js"; 

  const Meme = sequelize.define("meme", {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    textCaption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Meme.belongsTo(User);
  User.hasMany(Meme);

  export default Meme;

