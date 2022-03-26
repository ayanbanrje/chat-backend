var mongoose = require('mongoose');

var db;
var state = {
    db: null,
}
function connectDatabase() {
    if (!db) {
        var connection_string='' ;
        mongoose.connect('mongodb://localhost:27017/mychatapp', { 
            useNewUrlParser: true ,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false 
        });
        mongoose.set('debug', true);
        db = mongoose.connection;
        state.db = db;  
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
    return db;
}
exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}
module.exports = connectDatabase();