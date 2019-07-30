const express = require('express');


const router = express.Router();


const userControler = require('../controllers/users');
router.post('/auth',userControler.auth);
router.post('/register',userControler.register);



module.exports = router;