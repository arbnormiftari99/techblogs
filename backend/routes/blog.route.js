const express = require('express');
const BlogModel = require('../models/Blog');

const blogRoute = express.Router();

blogRoute.route('/').get(
    (req, res, next) => {
        BlogModel.find((error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
    }
)

module.exports = blogRoute;
