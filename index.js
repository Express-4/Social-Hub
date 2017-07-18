let express = require('express');
let mongoose = require('mongoose');

let app = express();

app.get('/', (req, res) => {
    mongoose.connect('mongodb://localhost:27017/express4');

    console.log('MongoDB ready!');
    res.send('Cool');
});

app.listen(1234);
console.log('Express ready..');