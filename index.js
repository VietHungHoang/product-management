const express = require('express');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
const cookieParser = require('cookie-parser');
const session = require('express-session');
//Flash
app.use(cookieParser("djhhdfhdf"));
app.use(session({cookie:{maxAge: 60000}}));
app.use(flash());

const database = require("./config/database");
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");


 

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

const systenConfig = require("./config/system")

app.locals.prefixAdmin = systenConfig.prefixAdmin;

// Routes
routeClient(app);
routeAdmin(app);




app.listen(port, () => {
    console.log(`Listen success on port ${port}`);
})