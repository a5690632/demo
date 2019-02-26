const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "baishipeng",
    database: "user"
});
db.query("SELECT * FROM `user`", (err, data) => {
    console.log(data);
});
const router = express.Router();
router.post("/", () => {
    console.log(2);
});
module.exports = router;
