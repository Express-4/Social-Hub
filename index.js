let express = require('express');
let mongoose = require('mongoose');

let app = express();
let env = process.env.NODE_ENV || 'development';
let port = process.env.port || 1234;
mongoose.Promise = global.Promise;

app.set('view engine', 'pug');
app.set('views','./server/views');
app.get('/', (req, res) => {
    mongoose.connect('mongodb://localhost:27017/express4');

    console.log('MongoDB ready!');
    res.render('index');
});

app.use(express.static('public'))

app.listen(port);
console.log('Express ready..');