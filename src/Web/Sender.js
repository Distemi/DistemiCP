module.exports.Standard = function (req, res, content, needAuth = false) {
    if (typeof content === "number") {
        if (content === 404) {
            res.send(GetFile('CPWebSite/Errors/404.html'));
        } else if (content === 404) {
            res.send(GetFile('CPWebSite/Errors/403.html'));
        }
        return false;
    } else {
        if (needAuth===false) {
            res.send(content);
        }
    }
}

module.exports.Advanced = function (req, res, FileURL, Custom = {}) { //WARNING!! Auth Needed!
    let Content = GetFile(`CPWebSite/${FileURL}`).toString();

    let CFGName = '';
    CFGName = 'lang';
    for (let key_0 in config.lang) {
        for (let key_1 in config.lang[key_0]) {
            Content = Content.split(`{${CFGName}:${key_0}:${key_1}}`).join(config.lang[key_0][key_1]);
        }
    }

    Content = Content.split('{user}').join(req.session.user);
    for(let key in Custom) {
        Content = Content.split(`{${key}}`).join(Custom[key]);
    }
    res.send(Content)
}
global.Sender = {
    Standard: module.exports.Standard,
    Advanced: module.exports.Advanced
};