const
    Sender = require('./Sender'),
    WebServer = require('../WebServer'),
    Logger = require('../Logger'),
    main = require('../main'),
    app = WebServer.app;

app.use((req, res, next) => {
    const url = req.url.split("?")[0];log(req, url);
    const File = GetFile(`CPWebSite${url}`);

    if(url.substr(1,3) === "css") {
        res.setHeader("content-type", "text/css");
    }
    //console.log(CPMainPath  + `/CPWebSite${url}`);
    if (!File) {
        Sender.Standard(req,res,404);
    } else {
        Sender.Standard(req,res,File);
    }

});
function log (req, url) {
    Logger.info(`${req.connection.remoteAddress}: ${url}  (${req.headers['user-agent']})`);
}