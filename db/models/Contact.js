import sequelize from "../Sequelize.js";

import { DataTypes } from "sequelize";

const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  avatarURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Contact.sync({alter: true});

export default Contact;
