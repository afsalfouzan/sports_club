const Sequelize = require("sequelize");
const database = require("../config/database");

let roles = database.define("roles", {
  role_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_name: {
    type: Sequelize.STRING(300),
    allowNull: false,
  },
},
{
    timestamps:true
});
roles.sync({force: false})

module.exports = roles;