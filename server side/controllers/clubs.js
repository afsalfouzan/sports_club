const clubModel = require("../models/clubs");
const { clubvalidationSchema } = require("../helpers/valiadation");

module.exports.createClub = async (req, res) => {
  try {
    if (req.data.role_id == 1 || req.data.role_id == 2) {
      if (req.file) {
        req.body.logo = req.file.path;
      }
      const validationSchema = await clubvalidationSchema(req.body);

      const user = await clubModel.findOne({
        where: { title: req.body.title },
        raw: true,
      });
      if (user) {
        throw { message: "club already exist" };
      } else {
        await clubModel
          .create({
            title: validationSchema.title,
            description: validationSchema.description,
            logo: validationSchema.logo,
            owner: req.data.user_id,
            max_no_attendees: validationSchema.max_no_attendees,
            instagram_link: req.body.instagram_link,
          })
          .then((club) => {
            res.status(200).json({
              message: "hurrey!!, your club is ready",
            });
          });
      }
    } else {
      throw {
        message: "you cannot create a club",
      };
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports.getClubs = async (req, res) => {
  try {
    let condition = {};
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
    if (req.data.role_id == 3) {
      throw {
        message: "you are a user,you cannot see the clud",
      };
    }
    if (req.data.role_id == 2) {
      condition["owner"] = req.data.user_id;
    }

    await clubModel
      .findAndCountAll({
        attributes: ["club_id", "title", "description", "owner"],
        where: condition,
        limit: limit,
        offset: offset,
      })
      .then((club) => {
        if (club) {
          res.status(200).json({
            message: "your clubs",
            club,
          });
        }
      });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports.editClub = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw {
        message: "no content to update",
      };
    }
    if (req.file) {
      req.body.logo = req.file.path;
    }
    let condition = {};
    if (req.data.role_id == 1) {
      if (req.query.club_id) {
        condition["club_id"] = req.query.club_id;
      } else {
        throw {
          message: "please enter the club",
        };
      }
    }
    if (req.data.role_id == 2) {
      condition["owner"] = req.data.user_id;
      if (req.query.club_id) {
        condition["club_id"] = req.query.club_id;
      } else {
        throw {
          message: "please enter the club",
        };
      }
    }
    if (req.data.role_id == 3) {
      throw { message: "you cannot edit club" };
    }
    const club = await clubModel.findOne({
      where: { club_id: req.query.club_id },
    });
    if (club) {
      await clubModel
        .update(req.body, {
          where: condition,
        })
        .then((updateclub) => {
          if (updateclub == 1) {
            res.status(200).json({
              message: "club updated!!!",
            });
          } else {
            res.status(400).json({
              message: "this club is not yours",
            });
          }
        });
    } else {
      throw { message: "club not found" };
    }
  } catch (e) {
    return res.json({ error: e.message });
  }
};

module.exports.trashClub = async (req, res) => {
  try {
    if (req.data.role_id == 3) {
      throw { message: "you cannot trash club" };
    }

    let condition = {};
    if (req.data.role_id == 1) {
      if (req.query.club_id) {
        condition["club_id"] = req.query.club_id;
      } else {
        throw {
          message: "please enter the club",
        };
      }
    }
    if (req.data.role_id == 2) {
      condition["owner"] = req.data.user_id;
      if (req.query.club_id) {
        condition["club_id"] = req.query.club_id;
      } else {
        throw {
          message: "please enter the club",
        };
      }
    }
    const club = await clubModel.findOne({
      where: { club_id: req.query.club_id },
    });
    if (club) {
      if (club.status == "trash") {
        throw { message: "the club is already in trashed state" };
      } else {
        await clubModel
          .update({ status: "trash" }, { where: condition })
          .then((trashclub) => {
            if (trashclub == 1) {
              res.status(200).json({
                message: "club trashed!!!",
              });
            } else {
              res.status(400).json({
                message: "this club is not yours",
              });
            }
          });
      }
    } else {
      res.status(400).json({
        message: "club not found",
      });
    }
  } catch (e) {
    return res.json({ error: e.message });
  }
};
