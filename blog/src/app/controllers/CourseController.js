const Course = require("../models/Course");
const { mongooesToObject } = require("../../util/mongoose");
class CourseController {
    // [get] /course/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('course/show', {course: mongooesToObject(course)})
            })
            .catch(next);
    }
}
module.exports = new CourseController();
