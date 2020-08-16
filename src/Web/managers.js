const
    WebServer = require('../WebServer'),
    app = WebServer.app;

app.get('/', (req, res) => {
    if (AuthCheck(req)===false) {
        Sender.Standard(req, res, GetFile(`CPWebSite/index.html`)
            .split('{lang:auth:Web:Authorisation}').join(config.lang.auth.Web.Authorisation)
            .split('{lang:auth:Web:login}').join(config.lang.auth.Web.login)
            .split('{lang:auth:Web:password}').join(config.lang.auth.Web.password)
            .split('{lang:auth:Web:auth}').join(config.lang.auth.Web.auth)
    );
    } else {
        res.redirect('/User/Home.html');
    }
});
app.post('/managers/auth', (req, res) => {
    L_log("auth request!");
    //console.log(req.body);
    if (typeof req.body.login !== "undefined" && typeof req.body.password !== "undefined") {
        if (req.body.login.length > 1 && req.body.password.length > 1) {
            //config.reload("UsersData");
            if (AuthCheck(req) === false) {
                if (typeof config.UsersData.Users[req.body.login] !== "undefined") {
                    if (config.UsersData.Users[req.body.login].Password === req.body.password) {
                        //Auth complete!
                        config.UsersData.Users[req.body.login].AuthData = {
                            key: generators.textGenerator(32),
                            ip: req.connection.remoteAddress
                        };
                        req.session.user = req.body.login;
                        req.session.key = config.UsersData.Users[req.body.login].AuthData.key;
                        config.save("UsersData");
                        res.send(JSON.stringify({'status':200,'data':`${config.lang.auth.Authorized}`}));
                    } else {
                        res.send(JSON.stringify({'status':403,'data':`${config.lang.auth.WrongPassword}`}));
                    }
                } else {
                    res.send(JSON.stringify({'status':403,'data':`${config.lang.auth.UserNotFound}`}));
                }
            } else {
                res.send(JSON.stringify({'status':200,'data':`${config.lang.auth.Authed}`}));
            }
        } else {
            res.send(JSON.stringify({'status':403,'data':`${config.lang.auth.NotInputData}`}));
        }
    } else {
        res.send(JSON.stringify({'status':403,'data':`${config.lang.auth.NotInputData}`}));
    }
});


function AuthCheck(req) {
    if (typeof req.session.key === "string"
        && typeof req.session.user === "string"
        && typeof req.session.Password === "string")
    {
        if (typeof config.UsersData.Users[req.session.user] !== 'undefined') {
            if (config.UsersData.Users[req.session.user].Password === req.session.Password
                && config.UsersData.Users[req.session.user].AuthData.key === req.session.key
                && config.UsersData.Users[req.session.user].AuthData.ip === req.connection.remoteAddress
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }

}
global.managers = {
    AuthCheck: AuthCheck
}