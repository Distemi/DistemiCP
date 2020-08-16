const fs = require('fs');
let NotFoundedServers = Object.keys(config.UsersData.Users);
function reload(){
    fs.readdir(global.CPMainPath + '\\Servers',(err, files) => {
        files.forEach((value, index, array) => {
            if (NotFoundedServers.includes(value)) {
                if (NotFoundedServers.indexOf(value) >= 0) {
                    NotFoundedServers.splice(NotFoundedServers.indexOf(value), 1);
                }
            } else {
                fs.rmdirSync(`${global.CPMainPath}\\Servers\\${value}`);
            }
        });
        NotFoundedServers.forEach((value, index, array) => {
            fs.mkdirSync(`${global.CPMainPath}\\Servers\\${value}`);
        });
    });
}
reload();
global.ServersManager = {};
global.ServersManager.GetDirURL = function (UserName) {
    return `${global.CPMainPath}\\Servers\\${UserName}\\`;
};
global.ServersManager.GetFileFromServer = function (FileUrl, UserName) {
    const ret = GetFile(`Servers\\${UserName}\\${FileUrl}`);
    return ret === false ? '' : ret;
}
//Server Per User - Manager
const { spawn } = require('child_process');
let pidusage = require('pidusage');
const ServerSpawn = spawn;
let Servers = {};
global.ServersManager.StartServer = function (UserName) {
    if (typeof Servers[UserName] === 'undefined') {
        if (fs.existsSync(ServersManager.GetDirURL(UserName) + 'server.jar')===true) {
            if (fs.existsSync(ServersManager.GetDirURL(UserName) + 'logs\\')) {
                fs.rmdirSync(ServersManager.GetDirURL(UserName) + 'logs', { recursive: true });
            }
            Servers[UserName] = ServerSpawn('java',['-Xmx1536M','-Dfile.encoding=UTF-8','-jar','server.jar','nogui'],{checkCWD: true, cwd: ServersManager.GetDirURL(UserName)});
            Servers[UserName].on('exit',function (){
                delete Servers[UserName];
            });
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
global.ServersManager.GetConsole = function (UserName) {
    if (fs.existsSync(ServersManager.GetDirURL(UserName) + 'logs\\latest.log')) {
        return fs.readFileSync(ServersManager.GetDirURL(UserName) + 'logs\\latest.log');
    } else {
        return config.lang.Web.Loading;
    }
}
global.ServersManager.StopServer = function (UserName) {
    if (typeof Servers[UserName] !== 'undefined') {
        Servers[UserName].stdin.write("stop" + "\n");
        return true;
    } else {
        return false;
    }
}
global.ServersManager.KillServer = function (UserName) {
    if (typeof Servers[UserName] !== 'undefined') {
        Servers[UserName].stdin.pause();
        Servers[UserName].kill();
        delete Servers[UserName];
        return true;
    } else {
        return false;
    }
}
global.ServersManager.RestartServer = function (UserName) {
    if (typeof Servers[UserName] !== 'undefined') {
        ServersManager.StopServer(UserName);
        setTimeout(()=>{
            if (typeof Servers[UserName] !== 'undefined') {
                ServersManager.KillServer(UserName);
                ServersManager.StartServer(UserName);
                return true;
            }
            ServersManager.StartServer(UserName);
            return true;
        },1500);
    } else {
        ServersManager.StartServer(UserName);
        return true;
    }
}
global.ServersManager.SendCommand = function (UserName, Command) {
    if (typeof Servers[UserName] !== 'undefined') {
        Servers[UserName].stdin.write(Command.toString().trim()+'\n');
        return true;
    } else {
        return false;
    }
}
global.ServersManager.GetStatus = function (UserName, CallBack) {
    if (typeof Servers[UserName] !== 'undefined' && typeof CallBack === 'function') {
        pidusage(Servers[UserName].pid,function (err,stats) {
            CallBack(err,stats,convertBytes);
        });
    } else if(typeof CallBack === 'function') {
        CallBack({'code':'404'})
    } else {
        return {'code':'404'};
    }
}
const convertBytes = function(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    if (bytes == 0) {
        return "n/a"
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    if (i == 0) {
        return bytes + " " + sizes[i]
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}
//console.log(global.ServersManager.StartServer('admin')); //TEST RUN