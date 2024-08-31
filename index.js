const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const database = require("./config/database");
const route = require("./routes/clients/index.route");

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes
route(app);


app.listen(port, () => {
    console.log(`Listen success on port ${port}`);
})