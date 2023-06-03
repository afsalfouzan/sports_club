var express = require("express")
var route = require("./routes/route");
var app = express();
const cors=require('cors')

const bodyParser = require("body-parser");
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public/uploads', express.static('public/uploads'))


app.use("/api",route);
app.listen(5000);
console.log("listening to port")


module.exports = app