const express = require('express');
const multer = require('multer');
const cloudinary = require('./cloudinary');
const Blog = require('./blog.model');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: './uploads/' });

app.post('/api/blog', upload.single('image'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.file;

        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'blog-images',
            public_id: `blog-${Date.now()}`,
        });

        const blog = new Blog({
            title,
            description,
            image: result.secure_url,
        });

        await blog.save();

        res.status(201).json({ message: 'Blog post created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating blog post' });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});