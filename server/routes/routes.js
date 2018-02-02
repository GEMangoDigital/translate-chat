const express = require('express');
const router = express.Router();

// Join chat room, send next free port
router.get('/join', (req, res, next) => {
    const webSocketPort = '3333';
    res.json({
        port: webSocketPort
    })
});

// Export routes
module.exports = router;
