const router = require('express').Router();

router.get(// #swagger.tags=['Home'];
    '/', (req, res) => { res.send('Hello from the index.js routes file!'); });

router.use('/api-docs', require('./swagger.js'));

router.use('/contacts', require('./contacts.js'));

module.exports = router;