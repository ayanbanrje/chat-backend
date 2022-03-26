let express = require("express");
let cors = require('cors')
let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

require('./config/routing')(app);

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(4300,()=>{
    console.log("Server is up")
})