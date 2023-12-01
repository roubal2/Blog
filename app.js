const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/Blog', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.render('index', { blogPosts });
    } catch (error) {
        console.error(error);
        res.send('Error fetching blog posts.');
    }
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/new', async (req, res) => {
    const { title, content } = req.body;

    try {
        await BlogPost.create({ title, content });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send('Error creating new blog post.');
    }
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});