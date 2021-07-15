module.exports = () => new DB()

class DB 
{
    connected;
    connect() {
        this.connected = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'RootSimplePasswordMainWorksEmeraldPanel',
            database : 'empl'
        }).connect();
    }
}