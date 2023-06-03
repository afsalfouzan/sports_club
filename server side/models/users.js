const Sequelize = require("sequelize");
const database = require("../config/database");
const roleModel = require("../models/roles");
const club_attendeesModel = require("../models/club_attendees");
let users = database.define(
  "users",
  {
    user_id: {
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
      references: {
        model: club_attendeesModel,
        key: "user_id",
      },
    },
    first_name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      defaultValue: 3,
      references: {
        model: roleModel,
        key: "role_id", 
      },
    },
    status: {
      type: Sequelize.ENUM("active", "inactive", "trash"),
      defaultValue: "active",
      allowNull: false,
    },
    created_by:{
      type: Sequelize.STRING(400),
      allowNull: true,
      defaultValue: 0
    },
    password: {
      type: Sequelize.STRING(400),
      allowNull: false,
    },
    password_salt: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING(450),
      allowNull: true,
      defaultValue: null
    },
  },
  {
    timestamps: true,
  }
);
users.sync()


roleModel.hasMany(users, { foreignKey: "role_id" });
users.belongsTo(roleModel, { foreignKey: "role_id" });

module.exports = users;
