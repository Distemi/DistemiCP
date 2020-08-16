function GetDate() {
    const now = new Date();
    return `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;
}
module.exports =
    {
        info: function (Message) {
            if (typeof Message === "string") {
                console.info(GetDate() + `[INFO]: ${Message}`);
            } else {return false;}
        },
        log: function (Message) {
            if (typeof Message === "string") {
                console.log(GetDate() + `[LOG]: ${Message}`);
            } else {return false;}
        },
        warn: function (Message) {
            if (typeof Message === "string") {
                console.warn(GetDate() + `[WARN]: ${Message}`);
            } else {return false;}
        },
        error: function (Message) {
            if (typeof Message === "string") {
                console.error(GetDate() + `[ERROR]: ${Message}`);
            } else {return false;}
        },
        clear: function (sendInfo = true) {
            console.clear()
            sendInfo === true ? this.info("Console cleared!") : true;
        }

    }
global.L_info = module.exports.info;
global.L_log = module.exports.log;
global.L_warn = module.exports.warn;
global.L_error = module.exports.error;