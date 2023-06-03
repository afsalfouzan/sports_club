const express = require("express");
const router = express.Router();
const { jwtTokenVerify } = require("../helpers/jwt");
const { upload } = require("../helpers/multer")

const  users = require("../controllers/users");
const roles = require("../controllers/roles");
const clubs = require("../controllers/clubs");
const club_attendees = require("../controllers/club_attendees")


//user
router.post("/users/signup",users.signup)
router.post("/users/login",users.loginUser)
router.put("/user/edit",jwtTokenVerify,users.editUserbyadmin)
router.get("/user/profile",jwtTokenVerify,users.getprofile)
router.put("/user/profile/edit",jwtTokenVerify,users.editprofile)
router.post("/users/forgotpassword",users.forgotPasswordmail)
router.put("/users/resetpassword",users.resetPassword)
router.put("/users/changepassword",jwtTokenVerify,users.changePassword)
router.delete('/user/trash',jwtTokenVerify,users.trashUser)
router.get("/users/list",jwtTokenVerify,users.listUsers)


//club_attendees
router.get("/club/attendees",jwtTokenVerify,club_attendees.getClub_attendees)
router.post(`/club/attendees/create`,jwtTokenVerify,club_attendees.insertClub_attendees)
router.put("/club/attendee/edit",jwtTokenVerify,club_attendees.updateClub_attendees)
router.delete("/club/attendee/trash",jwtTokenVerify,club_attendees.trashClub_attendees)


//invite users through mail
router.put("/users/invite",jwtTokenVerify,users.sigunpMail)


//club
router.post("/clubs/create",jwtTokenVerify,upload.single('logo'),clubs.createClub)
router.get("/clubs/list",jwtTokenVerify,clubs.getClubs)
router.put("/clubs/edit",jwtTokenVerify,upload.single('logo'),clubs.editClub)
router.delete("/clubs/trash",jwtTokenVerify,clubs.trashClub)

//roles
router.get("/roles/readroles",roles.getRoles)


module.exports = router 