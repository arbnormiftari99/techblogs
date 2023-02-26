const express = require('express');
const app = express();
const PORT = 8081;

/*applying the express json middleware 
so that every request that hits the endpoints,
 their request bodies can be converted to json*/

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`server running on http://localhost:${PORT}`)
);

app.get('/blogs',(req,res) => {
    res.status(200).send({
        hi:'hello',
        size:'large'
    })
})

app.post('/blogs/:id',(req,res) => {
    const { id } = req.params;
    const { body } = req.body;
    if(!body){
        res.status(418).send({
        message:'missing body'
        })
    }
    res.status(200).send({
        id: id,
        body: body
    })
})