const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello from the backend!'); });

router.use('/contacts', require('./contacts'));

module.exports = router;