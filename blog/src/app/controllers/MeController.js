const Course = require("../models/Course");
const { mongooesToObject } = require("../../util/mongoose");
const { MultipleMongooseToObject } = require("../../util/mongoose");
const { json } = require("express");

class MeController {
    // [GET] /me/stored-courses/:slug
    show(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => {
                res.render("me/stored-courses", {
                    courses: MultipleMongooseToObject(courses),
                    deleteCount: deleteCount, 
                });
            })
            .catch(next);

        // Course.find({})
        //     .then(courses =>  res.render('me/stored-courses', {
        //         courses: MultipleMongooseToObject(courses)
        //     }))
        //     .catch(next)
    }

    // [GET] /me/trash/courses
    courses_deleted(req, res, next) {
        Course.findDeleted()
            .then((courses) =>
                res.render("me/trash-courses", {
                    courses: MultipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();
