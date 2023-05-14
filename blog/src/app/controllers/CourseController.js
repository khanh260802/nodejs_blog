const Course = require('../models/Course');
const { mongooesToObject } = require('../../util/mongoose');
const { json } = require('express');
class CourseController {
    // [GET] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('course/show', { course: mongooesToObject(course) });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('course/create');
    }

    // [POST] /courses/saved
    save(req, res, next) {
        const data = req.body;
        data.image = `https://img.youtube.com/vi/${data.videoID}/maxresdefault.jpg`;
        
        const course = new Course(data);
        course.save()
            .then( res.redirect('/') )
            .catch(next);
    }

    // [GET] /courses/edit
    edit(req, res, next) {
        Course.findOne({_id : req.params.id }) 
            .then(course => {
                res.render('course/edit', {
                    course : mongooesToObject(course)
                }); 
            })
            .catch(next)
    }
    
     // [PUT] /courses/:id
    update(req, res, next) {
        const data = req.body; 
        Course.updateOne({_id : req.params.id}, data)
            .then(() => res.redirect('/') )
            .catch(next)
    }
}
module.exports = new CourseController();
