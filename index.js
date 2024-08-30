const express = require('express');
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

const route = require("./routes/clients/index.route");

// Routes
route(app);

app.listen(port, () => {
    console.log(`Listen success on port ${port}`);
})