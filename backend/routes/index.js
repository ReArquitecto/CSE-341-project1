const router = require('express').Router();

router.get('/', (req, res) => { res.send('Hello from the index.js routes file!'); });

router.use('/contacts', require('./contacts.js'));

module.exports = router;