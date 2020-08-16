const
    app = WebServer.app;
app.get('/admin.html', (req, res) => {
    if (managers.AuthCheck(req) === true) {
        if (config.UsersData.Users[req.session.user].AccessType === 'admin') {
            Sender.Advanced(req,res,'admin.html');
        } else {
            res.redirect('/User/Home.html');
        }
    } else {
        res.redirect('/');
    }
});
app.post('/admin.html', (req,res)=>{
    if (managers.AuthCheck(req) === true) {
        if (config.UsersData.Users[req.session.user].AccessType === 'admin') {
            switch (req.body.ReqMethod) {
                case 'Reg': {
                    const login = req.body.login;
                    const new_user = {
                        Password: req.body.password,
                        AccessType: req.body.is_admin === true ? 'admin' : 'user',
                        AuthData: {key:'none',ip:'none'}
                    };
                    if (typeof config.UsersData.Users[login] === 'undefined') {
                        config.UsersData.Users[login] = new_user;
                        config.save("UsersData");
                        res.send('User added');
                    } else {
                        res.send('User exist');
                    }
                    break;
                }
                default: {
                    res.send('Method not found');
                    break;
                }
            }
        } else {
            res.send('Need admin');
        }
    } else {
        res.send('Need Auth');
    }
});