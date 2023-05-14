const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug); 

const Schema = mongoose.Schema; 

const Course = new Schema({
    name: {type: String, default: 'haha'}, 
    description: {type: String}, 
    level: {type:String}, 
    videoID: {type: String}, 
    image:  {type: String}, 
    slug: {type:String, slug:'name', unique: true},
}, {
    timestamps : true, 
})

module.exports = mongoose.model('Course', Course); 

