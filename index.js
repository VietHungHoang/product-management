const express = require('express');
const app = express();
const port = 3000;

app.set("views", "./views")
app.set("view engine", "pug")

const route = require("./routes/clients/index.route");

// Routes
route(app);

app.listen(port, () => {
    console.log("Listen success on port 3000");
})