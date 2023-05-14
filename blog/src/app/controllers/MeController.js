const Course = require('../models/Course');
const { mongooesToObject } = require('../../util/mongoose');
const {MultipleMongooseToObject} = require("../../util/mongoose")
const { json } = require('express');

class MeController {
    // [GET] /course/:slug
    show(req, res, next) {
        Course.find({})
            .then(courses =>  res.render('me/stored-courses', {
                courses: MultipleMongooseToObject(courses)
            }))
            .catch(next)
        
    }

}
module.exports = new MeController();
