const
    app = WebServer.app;
app.get('/User/Home.html', (req, res) => {
    if (managers.AuthCheck(req) === true) {
        Sender.Advanced(req,res,'User/Home.html', {
            'adminPage': config.UsersData.Users[req.session.user].AccessType === 'admin' ? '<main class="el"><a href="/admin.html">Админ панель</a></main>' : ''
        });
    } else {
        res.redirect('/');
    }
});