module.exports = {
    MultipleMongooseToObject : function(mongooses) {
        return mongooses.map(mongoose => mongoose.toObject()); 
    },
    mongooesToObject: function(mongoose) {
        return mongoose.toObject();
    }
}