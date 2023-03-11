const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: {
            type: String
        },
        dateAdded: {
            type: Date
        },
        textContent: {
            type: String
        },
        username: {
            type: String
        },
        userId:{
            type: String
        },
        img:
        {
            name: String,
            data: Buffer,
            contentType: String
        }
    }, {
    collection: 'Blogs'
}
)



module.exports = mongoose.model('Blog', blogSchema);

