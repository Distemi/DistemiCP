let
    main = require("./main"),
    Logger = require('./Logger');
let CPSystem = {Web:{port:80,host:'127.0.0.1', Cookie:{MaxAge:0,secret:""}}};
let UsersData = {Users: {admin:{Password:"TestPass",Authed:'',AccessType:'',AuthData:{key:'',ip:''}}}};
let lang = {
    auth: {NotInputData:"",UserNotFound:"",WrongPassword:"",Authorized:""},
    Web: {Cabinet:'',Server:'',Welcome:''}
};

function reload(ConfigName = null) {
    if (ConfigName === null) {
        CPSystem = main.yaml.safeLoad(GetFile("config\\CPSystem.yml"));
        UsersData = main.yaml.safeLoad(GetFile("config\\UsersData.yml"));
        lang = main.yaml.safeLoad(GetFile("config\\lang.yml"));
    } else {
        switch (ConfigName) {
            case 'CPSystem': {
                CPSystem = main.yaml.safeLoad(GetFile("config\\CPSystem.yml"));
                break;
            }
            case 'UsersData': {
                UsersData = main.yaml.safeLoad(GetFile("config\\UsersData.yml"));
                break;
            }
            case 'lang': {
                lang = main.yaml.safeLoad(GetFile("config\\lang.yml"));
                break;
            }
        }
    }

}
function save(ConfigName = null) {
    if (ConfigName === null) {
        SaveFile("config\\CPSystem.yml",main.yaml.safeDump(CPSystem));//CPSystem
        SaveFile("config\\UsersData.yml",main.yaml.safeDump(UsersData));//UsersData
        SaveFile("config\\lang.yml",main.yaml.safeDump(lang));//lang
    } else {
        switch (ConfigName) {
            case 'CPSystem': {
                SaveFile("config\\CPSystem.yml",main.yaml.safeDump(CPSystem));//CPSystem
                break;
            }
            case 'UsersData': {
                SaveFile("config\\UsersData.yml",main.yaml.safeDump(UsersData));//UsersData
                break;
            }
            case 'lang': {
                SaveFile("config\\lang.yml",main.yaml.safeDump(lang));//lang
                break;
            }
        }
    }

}
reload();
module.exports =
    {
        reload: reload,
        save: save,
        CPSystem: CPSystem,
        UsersData: UsersData,
        lang: lang
    }
global.config = {
    reload: reload,
    save: save,
    CPSystem: CPSystem,
    UsersData: UsersData,
    lang: lang,
};

