const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("clients/pages/home/index");
})

module.exports = router;