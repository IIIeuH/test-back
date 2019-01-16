const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const Promise = require("bluebird");


const routes = require('./routes/index');
const config = require('./config');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({origin: ['http://localhost:8080']}));

app.use('/', routes);


app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json(err);
});


MongoClient.connect(config.url, { promiseLibrary: Promise, })
    .catch(err => console.error(err.stack))
    .then(db => {
        global.db = db;
        global.ObjectId = mongodb.ObjectId;
        app.listen(config.port, () =>{
            console.info(`Server starting on the port ${config.port}`);
        });
    });



module.exports = app;
