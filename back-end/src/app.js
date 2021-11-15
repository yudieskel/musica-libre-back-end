const express = require('express'),
         cors = require('cors'),
         path = require('path'),
 cookieParser = require('cookie-parser'),
      session = require('express-session'),
       config = require('config'),
        chalk = require('chalk'),
{ sequelize } = require('../db');

const port = config.get('server.port');

const app = express();

app.use( cookieParser(config.get('secret')) );

app.use( session({
    secret: config.get('secret'),
    resave: true,
    saveUninitialized: true 
    }) );

require('./passport/index')(app);

app.use( express.static(path.join(__dirname, 'public')) );

app.use( express.json() );
app.use( express.urlencoded( {extended: true} ) );

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Access-Control-Allow-Headers,Authorization, X-Requested-With");
  app.use(cors());
  next();
});

const mLibreRoutes = require('./routers/index');

app.use('/musicalibre/', mLibreRoutes);

app.listen( port, async () => {
    try {
        //Testar si está funcionando sequelize
        await sequelize.authenticate();
          console.log( chalk.bold.green('DataBase connected...') );
    
        //Sincronizar sequelize.sync({ alter: true }) ó sequelize.sync({ force: true })
        await sequelize.sync({ alter: true });  
          console.log(`El servidor se levantó como NODE_ENV ${chalk.bold.blue(config.NODE_ENV)} por el puerto ${chalk.bold.blue(port)}`);
          console.log( chalk.bold.green('All models were synchronized successfully.') );
    
        } catch (error) {
            console.log( chalk.bold.red('Error connecting Sequelize:'), error);
      }
});