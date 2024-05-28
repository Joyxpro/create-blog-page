const cloudinary = require('cloudinary').v2;

//Your cloudinary configuration info goes here , store them in the .env file with the same name
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;