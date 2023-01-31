const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");
// const express = require("express");

exports.userids = (req, res, next, Id) => {
  userSchema.findById(Id).exec((err, use) => {
    if (err || !use) {
      return res.status(400).json({ message: "cant save in to database" });
    }
    req.userSchema = use;
    next();
  });
};
exports.getss = (req, res) => {
  return res.json(req.userSchema);
};

// exports.verifyUserEmail = (req, res) => {
//   userSchema
//     .where("_id", req.proflie._id)
//     .updateOne({ $set: { verify: true } }, (err, user) => {
//       if (err) {
//         var path = require("path");
//         app = express();
//         app.use(express.static("controlls"));
//         res.sendFile(path.join(__dirname + "/error.html"));
//       } else {
//         var path = require("path");
//         app = express();
//         app.use(express.static("controlls"));
//         res.sendFile(path.join(__dirname + "/index.html"));
//       }
//     });
// };

exports.getTokenFromUser = (req, res, next, token) => {
  userSchema
    .findById(
      jwt.verify(token, process.env.ACTIVATION, (err, info) => {
        if (err) {
          return res.status(400).json({
            error: "invalid token",
          });
        }
        return info._id;
      })
    )
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "plsease ,signup first!",
        });
      }
      req.proflie = user;
      next();
    });
};
