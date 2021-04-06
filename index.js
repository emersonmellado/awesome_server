require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000

app.set('view engine', 'pug');
app.use(cors());

const categoryRoutes = require('./routes/api/categories')
const categoryAdminRoutes = require('./routes/admin/categories')

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', async (req, res) => {
    res.render('index');
})

app.use('/api/categories', categoryRoutes);
app.use('/admin/categories', categoryAdminRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})