const Sequelize = require("sequelize");
const database = require("../config/database");

let clubs = database.define("clubs", {
  club_id: {
    type: Sequelize.INTEGER(10),
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(450),
    allowNull: false,
  },
  owner: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('active', 'inactive', 'trash'),
    allowNull: false,
    defaultValue: "active",
  },
  logo: {
    type: Sequelize.STRING(400),
  },
  max_no_attendees: {
    type: Sequelize.STRING(400),
    defaultValue: 0,
  }
},
  {
    timestamps: true
  });
clubs.sync({ force: false })

module.exports = clubs