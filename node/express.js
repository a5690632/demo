const express = require("express")
const app = express()
const bodyParser = require('body-parser');
var cookie = require('cookie-parser');
app.use(express.static("www"))
app.use(cookie())

// app.use(bodyParser.urlencoded({
//     extended: false
// }))
app.use(bodyParser.json())
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers",
        "X-Requested-With,Origin,Content-Type,Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
});
app.use("/login", (req, res) => {
    console.log(1)
    res.write("1")
    res.end()
})
app.listen(99)