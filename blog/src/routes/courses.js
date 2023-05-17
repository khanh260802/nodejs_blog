const express = require('express'); 
const router = express.Router(); 
const CourseController = require('../app/controllers/CourseController'); 




router.post('/actions-from-trash', CourseController.actionsTrash);  

router.post('/actions', CourseController.actions); 
router.post('/saved', CourseController.save); 
router.get('/create', CourseController.create); 
router.get('/:id/edit', CourseController.edit); 
router.delete('/:id/destroy', CourseController.destroy); 
router.patch('/:id/restore', CourseController.restore); 
router.patch('/:id', CourseController.delete);
router.put('/:id', CourseController.update); 
router.get('/:slug', CourseController.show); 

module.exports = router; 

