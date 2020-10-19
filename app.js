const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const resources = require('./resources');

app.get('/apps', (req,res) => {
    const {sort, genre=""} = req.query;
    if(sort){
        if(!['rating', 'app'].includes(sort)){
            return res
            .status(400)
            .send('Sort must be one of rating or app')
        }
    }
    let results = resources.filter(resource => resource.Genres.toLowerCase().includes(genre.toLowerCase()))

    if(sort === "rating"){
        results
        .sort((a,b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    } else if( sort === "app"){
        results.sort(()=>{
            return results.App
        });
    }
    res.json(results);

})

app.listen(8000,()=>{
    console.log('Server started on PORT 8000')
})