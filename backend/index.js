const blogRoute = require('./routes/blog.route');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const createError = require('http-errors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 4000
console.log(process.env.PORT + "-the port")
//mongoDB connection
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connection.name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

/*applying the express json middleware 
so that every request that hits the endpoints,
 their request bodies can be converted to json*/

//if it doesnt work switch to bodyparser
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  }),
)
app.use(cors());

app.use('/api/blogs', blogRoute);

app.listen(
  port,
  () => console.log(`server running on http://localhost:${port}`)
);

app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})



// app.post('/blogs/:id',(req,res) => {
//     const { id } = req.params;
//     const { body } = req.body;
//     if(!body){
//         res.status(418).send({
//         message:'missing body'
//         })
//     }
//     res.status(200).send({
//         id: id,
//         body: body
//     })
// })