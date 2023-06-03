const Sequelize = require("sequelize");
const database = require("../config/database");
const userModel = require("../models/users");
const clubs = require("./clubs");

let club_attendees = database.define(
  "club_attendees",
  {
    club_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: "user_id",
      },
    },
    status: {
      type: Sequelize.ENUM("active", "inactive", "trash"),
      defaultValue: "active",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

club_attendees.sync({ force: true });


module.exports = club_attendees;
