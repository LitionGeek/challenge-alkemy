const express = require('express');
const morgan = require('morgan');
const sequelize = require("../database/index");
const login = require("./routes/login");
const personajes = require('./routes/personajes');
const peliculas = require('./routes/pelicula');
require('../database/asociations');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(express.urlencoded({ urlencoded: false }));
app.use(express.json());
app.use((req, res, next) => {

    next();
})

app.use(require('./routes'));
app.use(require('./routes/links'));
app.use('/auth', login)
app.use('/', personajes)
app.use('/', peliculas)

app.listen(app.get('port'), async () => {
    sequelize.authenticate().then(() => {
        console.log('DB Conectada');

    }).catch(error => {
        console.log('Se produce un error ' + error)
    })

    sequelize.sync({ force: false }).then(function () {
        console.log("Database Configured");
    });

    console.log('Server On port' + app.get('port'))
})