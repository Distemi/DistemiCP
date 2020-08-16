
const
    yaml = require('js-yaml'),
    fs   = require('fs'),
    path = require('path');
const CPMainPath = path.dirname(__dirname);
global.CPMainPath = CPMainPath;
function GetFile(URL) {
    URL = URL.split('..').join('');
    URL = URL.split('..').join('');

    try {
        fs.statSync(global.CPMainPath + '\\' + URL);
        if (fs.existsSync(global.CPMainPath + '\\' + URL)===true) {
            return fs.readFileSync(global.CPMainPath + '\\' + URL, 'utf8');
        }
    } catch (e) {
        return false;
    }
}
function SaveFile(URL, Content) {
    return fs.writeFileSync(global.CPMainPath + '\\' + URL, Content);
}
global.GetFile = GetFile;
global.SaveFile = SaveFile;
function textGenerator(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
global.generators = {};
global.generators.textGenerator = textGenerator;
module.exports =
    {
        path: path,
        yaml: yaml,
        fs: fs,
        CPMainPath: CPMainPath,
        GetFile: GetFile
    }
const
    Logger = require('./Logger'),
    Configs = require('./Configs');
module.exports += {
    Configs: Configs,
    Logger: Logger
}
const WebServer = require('./WebServer');
module.exports.WebServer = WebServer;
require('./ServersManager');
