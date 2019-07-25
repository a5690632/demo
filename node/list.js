const express = require("express");

const crypto = require("crypto");
const Sequelize = require('sequelize');

crypto.createHash("md5").update("123").digest("hex")


const sequelize = new Sequelize('user', 'root', 'baishipeng', {
    dialect: 'mysql',
});
var User = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
    },
    password: Sequelize.STRING,
    user: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false,
    raw: true,
});

const router = express.Router();
router.get("/", (req, res) => {
    let {
        pageNumber,
        pageSize
    } = req.query
    User.findAll({
        // limit: pageSize,
        // offset: pageNumber * pageSize
    }).then((data) => {
        let arr = []
        data.forEach((e) => {
            arr.push(e.dataValues)
        })
        res.status(200).send({
            total: 1,
            data: arr
        })
    })


})
router.post("/add", (req, res) => {
    let {
        user,
        password
    } = req.body
    User.create({
        user,
        password
    }).then((data) => {
        console.log(Data)
    })
})
router.post("/del", (req, res) => {
    let {
        id
    } = req.body
    User.destroy({
        where: {
            id
        }
    }).then()

})


module.exports = router