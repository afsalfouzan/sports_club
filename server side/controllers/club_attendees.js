const club_attendeesModel = require("../models/club_attendees");
const clubModel = require("../models/clubs");
const userModel = require("../models/users");
const { clubattendeesvalidation } = require("../helpers/valiadation");
const { Op, where } = require("sequelize");

module.exports.insertClub_attendees = async (req, res) => {
  try {
    const validate = await clubattendeesvalidation(req.body);
    let condition = {};
    let club_attendee = await club_attendeesModel.findOne({
      where: {
        [Op.and]: [{ club_id: req.body.club_id, user_id: req.body.user_id }],
      },
    });
    if (club_attendee) {
      throw {
        message: "attendee already exist",
      };
    } else {
      if (req.data.role_id == 1) {
        condition["club_id"] = validate.club_id;
      }
      if (req.data.role_id == 2) {
        condition["club_id"] = validate.club_id;
        condition["owner"] = req.data.user_id;
      }
      if (req.data.role_id == 3) {
        throw { message: "you cannot insert attendeees" };
      }
      const club = await clubModel.findOne({
        where: condition,
      });
      if (club) {
        let noofattendees = await club_attendeesModel.findAndCountAll({
          where: { club_id: req.body.club_id },
        });
        if (noofattendees.count < club.max_no_attendees) {
          const user = await userModel.findOne({
            where: { user_id: validate.user_id },
          });
          if (user) {
            await club_attendeesModel
              .create({
                club_id: validate.club_id,
                user_id: validate.user_id,
                status: validate.status,
              })
              .then((create) => {
                if (create) {
                  res.status(200).json({
                    message: "now you can attend the club",
                  });
                }
              });
          } else {
            throw { message: "user_id is invalid" };
          }
        } else {
          throw {
            message: "the club has reached max_no_attendees",
          };
        }
      } else {
        throw { message: "you have no club" };
      }
    }
  } catch (e) {
    return res.json({ error: e.message });
  }
};

module.exports.getClub_attendees = async (req, res) => {
  try {
    var limit;
    var offset;
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    } else {
      limit = 10;
    }
    if (req.query.offset) {
      offset = parseInt(req.query.offset);
    } else {
      offset = 0;
    }
    let condition = {};
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    } else {
      limit = 10;
    }
    if (req.query.status) {
      condition["status"] = req.query.status;
    }
    if (req.data.role_id == 3) {
      throw {
        message: "you cannot see the attendees",
      };
    }
    if (req.data.role_id == 2) {
      let ids = [];
      let club = await clubModel.findAll({
        attributes: ["club_id"],
        where: { owner: req.data.user_id },
      });
      club.forEach((item) => {
        ids.push(item.club_id);
      });
      condition["club_id"] = { [Op.in]: ids };
    }
    if (req.data.role_id == 3) {
      condition["user_id"] = req.data.user_id;
    }
    await club_attendeesModel
      .findAndCountAll({
        attributes: ["id", "club_id", "user_id"],
        where: condition,
        offset,
        limit,
      })
      .then((attendees) => {
        res.status(200).json({
          message: "attendees are",
          attendees,
        });
      });
  } catch (e) {
    return res.json({ error: e.message });
  }
};

module.exports.updateClub_attendees = async (req, res) => {
  try {
    let condition = {};
    if (req.data.role_id == 1) {
      if (req.query.id) {
        condition["id"] = req.query.id;
      } else {
        throw {
          message: "enter id to update",
        };
      }
      let update = await club_attendeesModel.update(req.body, {
        where: condition,
      });
      if (update) {
        throw {
          message: "updated successfully",
        };
      }
    }
    if (req.data.role_id == 3) {
      if (req.query.club_id) {
        let attendee = await club_attendeesModel.update(req.body, {
          where: {
            [Op.and]: [
              { club_id: req.query.club_id, user_id: req.data.user_id },
            ],
          },
        });
        if (attendee == 1) {
          throw {
            message: "updated successfully",
          };
        } else {
          throw {
            message: "you are not attending this club",
          };
        }
      } else {
        throw {
          message: "enter club_id to update or invalid club_id",
        };
      }
    }
    if (req.data.role_id == 2) {
      if (req.query.id) {
        condition["id"] = req.query.id;
      } else {
        throw {
          message: "enter id to update",
        };
      }
    }

    const club = await club_attendeesModel.findOne({
      where: condition,
    });
    if (club) {
      let clubmodel = await clubModel.findOne({
        where: {
          [Op.and]: [{ club_id: club.club_id, owner: req.data.user_id }],
        },
      });
      if (clubmodel) {
        if (
          club.user_id == req.body.user_id ||
          club.status == req.body.status
        ) {
          throw { message: "no updates" };
        } else {
          await club_attendeesModel.update(req.body, {
            where: { id: req.query.id },
          });
          res.status(200).json({ message: "attendee updated successfully" });
        }
      } else {
        throw { message: "club is not yours" };
      }
    } else {
      throw { message: "id not found" };
    }
  } catch (e) {
    return res.json({ error: e.message });
  }
};

module.exports.trashClub_attendees = async (req, res) => {
  try {
    let condition = {};
    if (req.data.role_id == 1 || req.data.role_id == 2) {
      condition["id"] = req.query.id;
    }
    if (req.data.role_id == 3) {
      condition["user_id"] = req.data.user_id;
    }
    const club = await club_attendeesModel.findOne({
      where: condition,
    });
    if (club) {
      let clubmodel = await clubModel.findOne({
        where: {
          [Op.and]: [{ club_id: club.club_id, owner: req.data.user_id }],
        },
      });
      if (clubmodel) {
        if (club.status == "trash") {
          throw { message: "attendee already in trash" };
        } else {
          await club_attendeesModel.update(
            { status: "trash" },
            {
              where: { id: req.query.id },
            }
          );
          res.status(200).json({ message: "user trashed successfully" });
        }
      } else {
        throw { message: "club is not yours" };
      }
    } else {
      throw { message: "id not found" };
    }
  } catch (e) {
    return res.json({ error: e.message });
  }
};
