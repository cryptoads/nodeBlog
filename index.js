const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const blogData = 'blog-data.json'
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    fs.readFile(blogData, (err, data)=>{
    if(err) return console.log(err);
    res.send(JSON.parse(data));
})
});

app.get('/post/:id', (req, res)=>{
    fs.readFile(blogData, (err, data)=>{
        if(err) return console.log(err);
        const post = req.params.id.toString();
        const parser = JSON.parse(data);
        const result = parser[post]
        res.send(result);
      });  
});



app.post('/new', (req,res)=>{
        fs.readFile(blogData, (err, data)=>{
        if(err) return console.log(err);
        let posts = JSON.parse(data);
        let newId = Object.keys(posts).length + 1;
        let newContent = {
            id: newId,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date: req.body.date,
            title: req.body.title,
            content: req.body.content
        };
        posts[newId] = newContent;
        fs.writeFile(blogData, JSON.stringify(posts, null, ' '), ()=>{
            res.send(newContent);
        })
    })
})
app.listen(3000, ()=> console.log('running on port 3000'));
