const express = require('express');
const app = express();
const generoRoute = require('./routes/generoRoute');
const filmesRoute = require('./routes/filmesRoute');
app.set('port', process.env.PORT||3001);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type,Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/genero', generoRoute);
app.use('/filmes', filmesRoute);
app.use('/', (req, res) => {
    app.use('/filmes', filmesRoute)
})
app.listen(app.get('port'), () => {
    console.log("Servidor iniciado na porta " + app.get('port'));
})