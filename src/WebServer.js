const
    main = require('./main'),
    express = require("express"),
    Logger = require('./Logger'),
    Configs = require('./Configs'),
    bodyParser = require('body-parser'),
    ExpressSession = require('express-session'),
    app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(ExpressSession({
    secret: config.CPSystem.Web.CookieSecret,
    cookie: {maxAge: 4147200, secure: false},
    resave: false,
    saveUninitialized: true

}));


let WebStatic;
let managers;

module.exports = {
   app: app,
   express: express
}



const server = app.listen(Configs.CPSystem.Web.port, Configs.CPSystem.Web.host, function (){
    managers = require('./Web/managers');

    require('./Web/Admin');
    require('./Web/User/Home');
    require('./Web/User/Cabinet');
    require('./Web/User/Server');

    WebStatic = require('./Web/Static');
    Logger.info(`Web server running in http://${server.address().address}:${server.address().port}/`);
});
global.WebServer = module.exports;