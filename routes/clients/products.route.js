const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("clients/pages/products/index");
})

router.get('/create', (req, res) => {
    res.render("clients/pages/products/index");
})

router.get('/edit', (req, res) => {
    res.render("clients/pages/products/index");
})

router.get('/delete', (req, res) => {
    res.render("clients/pages/products/index");
})

module.exports = router;