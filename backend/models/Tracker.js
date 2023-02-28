const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackerSchema = new Schema(
    {
        operationType: {
            type: String
        },
        dateAdded: {
            type: Date
        },
        operationDescription: {
            type: String
        },
    }, {
    collection: 'Tracks'
}
)



module.exports = mongoose.model('Tracker', trackerSchema);

