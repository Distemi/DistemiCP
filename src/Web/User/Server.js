const
    app = WebServer.app;
app.get('/User/Server.html', (req, res) => {
    if (managers.AuthCheck(req) === true) {
        Sender.Advanced(req,res,'User/Server.html', {
            'console': ServersManager.GetFileFromServer("logs/latest.log", req.session.user).split('\r\n').join('<br>'),
            'adminPage': config.UsersData.Users[req.session.user].AccessType === 'admin' ? '<main class="el"><a href="/admin.html">Админ панель</a></main>' : ''
        });
   } else {
        res.redirect('/');
    }
});

app.post('/User/Server.html', (req, res)=> {
    if (typeof req.body.ReqMethod !== 'undefined' && managers.AuthCheck(req) === true) {
        const UserName = req.session.user;
        switch (req.body.ReqMethod) {
            case 'StartServer': {
                res.send(ServersManager.StartServer(UserName));
                break;
            }
            case 'getConsole': {
                res.send(ServersManager.GetConsole(UserName));
                break;
            }
            case 'StopServer': {
                res.send(ServersManager.StopServer(UserName));
                break;
            }
            case 'KillServer': {
                res.send(ServersManager.KillServer(UserName));
                break;
            }
            case 'RestartServer': {
                res.send(ServersManager.RestartServer(UserName));
                break;
            }
            case 'SendCommand': {
                res.send(ServersManager.SendCommand(UserName, req.body.Data));
                break;
            }
            case 'GetStats': {
                ServersManager.GetStatus(UserName,function (err, stats, convertBytes) {
                    if (!err) {
                        res.send({mem: convertBytes(stats.memory), cpu: stats.cpu.toFixed(1)});
                    } else {
                        res.send(err);
                    }
                })
                break;
            }
            default: {
                res.send('Method not found');
                break;
            }
        }
    }
});