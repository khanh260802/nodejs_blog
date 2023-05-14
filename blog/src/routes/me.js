const express = require('express'); 
const router = express.Router(); 
const MeController  = require('../app/controllers/MeController'); 


router.use('/stored-courses', MeController.show); 
module.exports = router; 