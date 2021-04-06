const express = require('express');
const app = express();
const port = process.env.PORT || 3000

const categoryRoutes = require('./routes/categories')

app.get('/', (req, res) => {
    res.send("<h1 style='color: blue;'>Hello hello from Awesome server</h1>")
})

app.use('/categories', categoryRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})