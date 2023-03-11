const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String
        },
        firstName: {
            type: Date
        },
        lastName: {
            type: String
        },
        userName: {
            type: String
        },
    }, {
    collection: 'Users'
}
)



module.exports = mongoose.model('User', userSchema);

