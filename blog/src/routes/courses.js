const express = require('express'); 
const router = express.Router(); 
const CourseController = require('../app/controllers/CourseController'); 


router.get('/:id/edit', CourseController.edit)
router.post('/saved', CourseController.save)
router.get('/create', CourseController.create)
router.put('/:id', CourseController.update); 
router.get('/:slug', CourseController.show); 

module.exports = router; 

