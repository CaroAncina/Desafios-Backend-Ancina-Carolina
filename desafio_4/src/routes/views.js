const express = require("express");
const router = express.Router();


router.get('/realTimeProducts', (req, res) => {
    res.render('realtimeProducts', {});
})

module.exports = router;