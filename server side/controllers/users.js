const userModel = require("../models/users");
const club_attendeesModel = require("../models/club_attendees");
const clubModel = require("../models/clubs");
const crypto = require("crypto");
const {
  userSchema,
  resetpasswordSchema,
  userloginvalidation,
} = require("../helpers/valiadation");
const { jwtTokenGeneration } = require("../helpers/jwt");
const SendMail = require("../helpers/gmail");
const { Op } = require("sequelize");

module.exports.signup = async (req, res) => {
  try {
    console.log(req.body, "bodyyyyyyyyyy");
    if (req.query.email) {
      req.body.email = req.query.email;
    }
    let user = await userModel.findOne({ where: { email: req.body.email } });
    if (user) {
      res.send({ message: "User email exists" });
    } else {
      const validationSchema = await userSchema(req.body);
      const password_salt = Math.random().toString(36).slice(-8);
      const hash = crypto
        .createHmac("sha256", password_salt)
        .update(validationSchema.password)
        .digest("hex");
      let createuser = await userModel.create({
        first_name: validationSchema.first_name,
        last_name: validationSchema.last_name,
        email: validationSchema.email,
        phone_number: validationSchema.phone_number,
        password: hash,
        password_salt: password_salt,
      });
      if (createuser) {
        res.status(200).json({
          message: "hurrey!! you are registered the club",
        });
      }
      if (req.query.club_id) {
        let user = await userModel.findOne({
          attributes: ["user_id"],
          where: { email: validationSchema.email },
        });
        if (user) {
          let attendee = await club_attendeesModel.create({
            club_id: req.query.club_id,
            user_id: user.user_id,
          });
        }
      }
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports.loginUser = async (req, res) => {
  try {
    console.log(req.body, "daaaaaaaaaash");
    let validationSchema = await userloginvalidation(req.body);
    await userModel
      .findOne({
        where: { email: validationSchema.email },
      })
      .then((user) => {

        if (user) {

          const encypteddata = crypto
            .createHmac("sha256", user.password_salt)
            .update(req.body.password)
            .digest("hex");
          if (encypteddata == user.password) {
            let tokenData = {
              user_id: user.user_id,
              email: user.email,
              role_id: user.role_id,
            };

    let token = jwtTokenGeneration(tokenData);
    console.log("validation schema",tokenData)

            console.log(token,"token")
            res.status(200).send({
              message: "logged in successfully",
              user: {
                user_id: user.user_id,
                firstname: user.first_name,
                lastname: user.last_name,
                email: user.email,
                role_id:user.role_id,
                token: token,
              },
            });
          } else {
            res.status(400).json({
              message: "password is incorrect",
            });
          }
        } else {
          console.log("hiiiii")
          res.status(400).json({
            message: "incorrect email",
          });
        }
      });
  } catch (e) {
    console.log(e.message, "error");
    res.status(400).json({
      error: e.message,
    });
  }
};
module.exports.getprofile = async (req, res) => {
  try {
    let user = await userModel.findOne({
      where: { user_id: req.data.user_id },
    });
    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      throw {
        message: "invalid user",
      };
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};
module.exports.editprofile = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw {
        message: "No content to update",
      };
    }
    if (req.body.email) {
      throw {
        message: "you cannot update email",
      };
    } else {
      let user = await userModel.findOne({
        where: { user_id: req.data.user_id },
      });
      if (user) {
        let update = await userModel.update(req.body, {
          where: { user_id: req.data.user_id },
        });
        if (update) {
          res.status(200).json({
            message: "profile updated successfully",
          });
        }
      }
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports.editUserbyadmin = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw {
        message: "No content to update",
      };
    }
    if (req.data.role_id == 1 || req.data.role_id == 2) {
      if (req.query.user_id) {
        let user = await userModel.findOne({
          where: { user_id: req.query.user_id },
        });
        if (user) {
          if (req.data.role_id == 2) {
            if (user.created_by == req.data.user_id) {
              await userModel
                .update(req.body, { where: { user_id: req.query.user_id } })
                .then(() => {
                  return res.status(200).send({
                    message: "user updated succefully",
                  });
                });
            } else {
              return res.status(400).send({
                message: "user not in your under",
              });
            }
          } else {
            await userModel
              .update(req.body, { where: { user_id: req.query.user_id } })
              .then((user) => {
                if (user == 1)
                  return res.status(201).send({
                    message: "user updated succefully",
                  });
              });
          }
        } else {
          throw {
            message: "invalid user_id",
          };
        }
      } else {
        throw {
          message: "user_id required",
        };
      }
    } else {
      throw {
        message: "you cannot edit users",
      };
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports.forgotPasswordmail = async (req, res) => {
  try {
    console.log(req.body, "daaaaaaaaaaaaaaaaaaaaaaaaash");
    if (req.body.email) {
      await userModel
        .findOne({
          where: { email: req.body.email },
        })
        .then(async (user) => {
          if (user) {
            let email = user.email;
            let token = Math.random().toString(36).slice(-8);
            let link = `http://localhost:3000/email/resetpassword/${token}/${email}`;
            await userModel.update(
              { token: token },
              { where: { email: req.body.email } }
            );

            let message = "<a href=" + `${link}` + ">click here</a>";

            console.log(message, "message");

            let mail = {
              to: req.body.email,
              subject: "Reset Password",
              text: "Click the link below to reset password",
              html:
                "<h1>Click the link below to reset password</h1><br>" + message,
            };
            SendMail(mail);
            res.status(200).json({
              message: "click the link sent to your mailbox",
              mail,
            });
          } else {
            throw {
              message: "invalid mail",
            };
          }
        });
    } else {
      throw {
        message: "please enter email id",
      };
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    console.log(req.query,req.body,"request bodyyyy")
    const validationSchema = await resetpasswordSchema(req.body);
    userModel
      .findOne({
        where: { email: req.query.email },
      })
      .then(async (user) => {
        if (user.token == req.query.token) {
          const password_salt = Math.random().toString(30).slice(-7);
          const hash = crypto
            .createHmac("sha256", password_salt)
            .update(validationSchema.newpassword)
            .digest("hex");
          await userModel
            .update(
              { password: hash, password_salt: password_salt },
              { where: { email: req.query.email } }
            )
            .then(() => {
              return res.status(200).send({
                message: "Password updated succefully",
              });
            });
        } else {
          return res.status(400).send({
            message: "link expired",
          });
        }
        await userModel.update(
          { token: null },
          { where: { email: req.query.email } }
        );
      });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    if (req.body.newpassword == req.body.confirmpassword) {
      let user = await userModel.findOne({
        where: { email: req.data.email },
      });
      const hash = crypto
        .createHmac("sha256", user.password_salt)
        .update(req.body.currentpassword)
        .digest("hex");
      if (user.password == hash) {
        const password_salt = Math.random().toString(36).slice(-8);
        const hash = crypto
          .createHmac("sha256", password_salt)
          .update(req.body.newpassword)
          .digest("hex");
        userModel.update(
          { password: hash, password_salt: password_salt },
          { where: { email: req.data.email } }
        );
        res.status(200).json({
          message: "Password updated successfully",
        });
      } else {
        res.status(400).json({
          message: "current password is incorrect",
        });
      }
    } else {
      res.status(400).json({
        message: "password didn't password",
      });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

module.exports.trashUser = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw {
        message: "user_id required",
      };
    }
    if (req.data.role_id == 1) {
      let user1 = userModel.update(
        { status: "trash" },
        { where: { user_id: req.body.user_id } }
      );
      if (user1) {
        res.status(200).json({
          message: "user trashed",
        });
      }
    }
    if (req.data.role_id == 2) {
      let user = await userModel.findOne({
        where: { user_id: req.body.user_id },
      });
      if (user) {
        if (user.status == "trash") {
          throw {
            message: "the user is already in trashed state",
          };
        } else {
          if (user.created_by == req.data.user_id) {
            let userdelete = await userModel.update(
              { status: "trash" },
              { where: { user_id: req.body.user_id } }
            );
            if (userdelete) {
              res.status(200).json({
                message: "user trashed",
              });
            }
          } else {
            res.status(400).json({
              message: "user not in your under",
            });
          }
        }
      } else {
        throw {
          message: "invalid user_id",
        };
      }
    } else {
      res.status(400).json({
        message: "you cannot trash users!!",
      });
    }
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
};

module.exports.listUsers = async (req, res) => {
  try {
    console.log(req.query, "daaaaashed");
    var limit, offset;
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
    if (req.data.role_id == 2) {
      condition["created_by"] = req.data.user_id;
    }
    if (req.data.role_id == 3) {
      condition["user_id"] = req.data.user_id;
    }
    await userModel
      .findAndCountAll({
        where: condition,
        offset,
        limit,
        attributes: [
          "user_id",
          "first_name",
          "last_name",
          "email",
          "phone_number",
        ],
      })
      .then((listUsers) => {
        if (listUsers) {
          res.status(200).json({
            listUsers,
          });
        } else {
          res.status(400).json({
            message: "no users in your club",
          });
        }
      });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

module.exports.sigunpMail = async (req, res) => {
  try {
    let emails = [];
    if (req.data.role_id == 1 || req.data.role_id == 2) {
      let emailarray = req.body.email;
      for (item of emailarray) {
        let searchUser = await userModel.findOne({
          attributes: ["user_id", "email"],
          where: { email: item },
        });
        if (searchUser) {
          emails.push(searchUser.user_id);
          let index = emailarray.indexOf(item);
          emailarray.splice(index, 1);
        }
      }
      let club = await clubModel.findOne({
        where: {
          [Op.and]: [{ club_id: req.query.club_id, owner: req.data.user_id }],
        },
      });
      if (club) {
        for (item of emails) {
          let searchattendee = await club_attendeesModel.findOne({
            where: {
              [Op.and]: [{ club_id: req.query.club_id, user_id: item }],
            },
          });
          if (!searchattendee) {
            await club_attendeesModel.create({
              club_id: req.query.club_id,
              user_id: item,
            });
          }
          let sendmail = [];
          for (item of emailarray) {
            let club_id = club.club_id;
            let email = item;
            let mail = {
              to: item,
              subject: "invitation link",
              text: `Click the link below to enter the club ${club.title}`,
              html: `http://localhost:5000/api/users/signup?club_id=${club_id}&email=${email}`,
            };
            SendMail(mail);
            sendmail.push(mail);
          }
          res.json({
            sendmail,
          });
        }
      } else {
        throw { message: "the club is not yours" };
      }
    } else {
    }
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
