const mongoose = require('mongoose');

// Use your own mongodb uri in the dotenv file.
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;