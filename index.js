const express = require('express');
const app = express();
const port = 3000;

app.set("views", "./views")
app.set("view engine", "pug")

app.get('/', (req, res) => {
    res.render("clients/pages/home/index");
})

app.get('/products', (req, res) => {
    res.render("clients/pages/products/index");
})

app.listen(port, () => {
    console.log("Listen success on port 3000");
})