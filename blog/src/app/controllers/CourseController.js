const Course = require("../models/Course");
const { mongooesToObject } = require("../../util/mongoose");
const { json } = require("express");
class CourseController {
    // [GET] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render("course/show", { course: mongooesToObject(course) });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render("course/create");
    }

    // [POST] /courses/saved
    save(req, res, next) {
        const data = req.body;
        data.image = `https://img.youtube.com/vi/${data.videoID}/maxresdefault.jpg`;

        const course = new Course(data);
        course.save().then(res.redirect("/me/stored-courses")).catch(next);
    }

    // [GET] /courses/edit
    edit(req, res, next) {
        Course.findOne({ _id: req.params.id })
            .then((course) => {
                res.render("course/edit", {
                    course: mongooesToObject(course),
                });
            })
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const data = req.body;
        data.image = `https://img.youtube.com/vi/${data.videoID}/maxresdefault.jpg`;
        Course.updateOne({ _id: req.params.id }, data)
            .then(() => res.redirect("/"))
            .catch(next);
    }

    // [PATCH] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);

        //
    }

    // [DELETE] /courses/:id/destroy
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [POST] /courses/actions
    actions(req, res, next) {
        switch (req.body["select-action"]) {
            case "delete":
                Course.delete({ _id: { $in: req.body["checkbox-items"] } })
                    .then(res.redirect("back"))
                    .catch("next");
                break;
            default:
                res.send("The action's not valid");
        }
    }

    // [POST] /courses/actions-from-trash
    actionsTrash(req, res, next) {
        switch (req.body["select-action"]) {
            case "restore":
                Course.restore({ _id: { $in: req.body["checkbox-items"] } })
                    .then(res.redirect("back"))
                    .catch("next");
                break;
            case "destroy":
                Course.deleteMany({ _id: { $in: req.body["checkbox-items"] } })
                    .then(res.redirect("back"))
                    .catch("next");
                break;
            default:
                res.send("The action's not valid");
        }
    }
}
module.exports = new CourseController();
