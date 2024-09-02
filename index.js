const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const database = require("./config/database");
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes
routeClient(app);
routeAdmin(app);



app.listen(port, () => {
    console.log(`Listen success on port ${port}`);
})